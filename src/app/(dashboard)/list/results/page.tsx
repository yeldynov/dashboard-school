import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role } from '@/lib/data'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { Prisma, Result } from '@prisma/client'
import Image from 'next/image'

type ResultList = {
  id: number
  title: string
  studentName: string
  studentSurname: string
  teacherName: string
  teacherSurname: string
  score: number
  className: string
  startTime: Date
}

const columns = [
  {
    header: 'Title',
    accessor: 'title',
  },
  {
    header: 'Student',
    accessor: 'student',
  },
  {
    header: 'Score',
    accessor: 'score',
    className: 'hidden md:table-cell',
  },

  {
    header: 'Teacher',
    accessor: 'teacher',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Class',
    accessor: 'class',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const renderRow = (item: ResultList) => {
  return (
    <tr
      key={item.id}
      className='text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
    >
      <td className='flex items-center gap-4 p-4'>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.title}</h3>
        </div>
      </td>
      <td>{item.studentName + ' ' + item.studentSurname}</td>
      <td className='hidden md:table-cell'>{item.score}</td>
      <td className='hidden md:table-cell'>
        {item.teacherName + ' ' + item.teacherSurname}
      </td>
      <td className='hidden md:table-cell'>{item.className}</td>
      <td className='hidden md:table-cell'>
        {new Intl.DateTimeFormat('en-US').format(item.startTime)}
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {role === 'admin' && (
            <>
              <FormModal table='result' type='update' data={item} />
              <FormModal table='result' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

const ResultsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { page, ...queryParams } = searchParams

  const p = page ? parseInt(page) : 1

  // URL PARAMS CONDITIONS

  const query: Prisma.ResultWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'studentId':
            query.studentId = value
            break
          case 'search':
            query.OR = [
              { exam: { title: { contains: value, mode: 'insensitive' } } },
              { student: { name: { contains: value, mode: 'insensitive' } } },
            ]

            break
          default:
            break
        }
      }
    }

    const [dataResponse, count] = await prisma.$transaction([
      prisma.result.findMany({
        where: query,
        include: {
          student: { select: { name: true, surname: true } },
          exam: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
          assignment: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),

      prisma.result.count({
        where: query,
      }),
    ])

    const data = dataResponse.map((item) => {
      const assessment = item.exam || item.assignment

      if (!assessment) return null

      const isExam = 'startTime' in assessment

      return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        score: item.score,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : assessment.startDate,
      }
    })

    return (
      <div className='flex-1 p-4 m-4 mt-0 bg-white rounded-md'>
        {/* TOP */}
        <div className='flex justify-between'>
          <h1 className='hidden text-lg font-semibold md:block'>All Results</h1>
          <div className='flex flex-col items-center w-full gap-4 md:w-auto md:flex-row'>
            <TableSearch />
            <div className='flex items-center self-end gap-4'>
              <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
                <Image src='/filter.png' alt='' width={14} height={14} />
              </button>
              <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
                <Image src='/sort.png' alt='' width={14} height={14} />
              </button>
              {role === 'admin' && <FormModal table='result' type='create' />}
            </div>
          </div>
        </div>
        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={data} />
        {/* Pagination */}
        <Pagination page={p} count={count} />
      </div>
    )
  }
}
export default ResultsListPage

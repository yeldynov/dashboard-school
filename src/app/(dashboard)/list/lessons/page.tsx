import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, lessonsData } from '@/lib/data'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { Class, Lesson, Prisma, Subject, Teacher } from '@prisma/client'
import Image from 'next/image'

type LessonList = Lesson & { subject: Subject } & { class: Class } & {
  teacher: Teacher
}

const columns = [
  {
    header: 'Subject Name',
    accessor: 'name',
  },
  {
    header: 'Class',
    accessor: 'class',
  },
  {
    header: 'Teacher',
    accessor: 'teacher',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const renderRow = (item: LessonList) => {
  return (
    <tr
      key={item.id}
      className='text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
    >
      <td className='flex items-center gap-4 p-4'>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.subject.name}</h3>
        </div>
      </td>
      <td>{item.class.name}</td>
      <td className='hidden md:table-cell'>
        {item.teacher.name + ' ' + item.teacher.surname}
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {role === 'admin' && (
            <>
              <FormModal table='lesson' type='update' data={item} />
              <FormModal table='lesson' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

const LessonsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { page, ...queryParams } = searchParams

  const p = page ? parseInt(page) : 1

  // URL PARAMS CONDITIONS

  const query: Prisma.LessonWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'classId':
            query.classId = parseInt(value)
            break
          case 'teacherId':
            query.teacherId = value
            break
          case 'search':
            {
              query.OR = [
                {
                  subject: {
                    name: {
                      contains: value,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  teacher: {
                    name: {
                      contains: value,
                      mode: 'insensitive',
                    },
                  },
                },
              ]
            }
            break
          default:
            break
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        include: {
          subject: { select: { name: true } },
          class: { select: { name: true } },
          teacher: { select: { name: true, surname: true } },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),

      prisma.lesson.count({
        where: query,
      }),
    ])

    return (
      <div className='flex-1 p-4 m-4 mt-0 bg-white rounded-md'>
        {/* TOP */}
        <div className='flex justify-between'>
          <h1 className='hidden text-lg font-semibold md:block'>All Lessons</h1>
          <div className='flex flex-col items-center w-full gap-4 md:w-auto md:flex-row'>
            <TableSearch />
            <div className='flex items-center self-end gap-4'>
              <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
                <Image src='/filter.png' alt='' width={14} height={14} />
              </button>
              <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
                <Image src='/sort.png' alt='' width={14} height={14} />
              </button>
              {role === 'admin' && <FormModal table='lesson' type='create' />}
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

export default LessonsListPage

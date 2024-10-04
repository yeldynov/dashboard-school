import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, classesData } from '@/lib/data'
import prisma from '@/lib/prisma'
import { ITEM_PER_PAGE } from '@/lib/settings'
import { Class, Prisma, Teacher } from '@prisma/client'
import Image from 'next/image'

type ClassList = Class & { supervisor: Teacher }

const columns = [
  {
    header: 'Class Name',
    accessor: 'name',
  },
  {
    header: 'Capacity',
    accessor: 'capacity',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Grade',
    accessor: 'grade',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Supervisor',
    accessor: 'supervisor',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const renderRow = (item: ClassList) => {
  return (
    <tr
      key={item.id}
      className='text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
    >
      <td className='flex items-center gap-4 p-4'>
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.name}</h3>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.name[0]}</td>
      <td className='hidden md:table-cell'>{item.capacity}</td>
      <td className='hidden md:table-cell'>
        {item.supervisor.name + ' ' + item.supervisor.surname}
      </td>
      <td>
        <div className='flex items-center gap-2'>
          {role === 'admin' && (
            <>
              <FormModal table='class' type='update' data={item} />
              <FormModal table='class' type='delete' id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { page, ...queryParams } = searchParams

  const p = page ? parseInt(page) : 1

  // URL PARAMS CONDITIONS

  const query: Prisma.ClassWhereInput = {}

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case 'supervisorId':
            query.supervisorId = value
            break
          case 'search':
            {
              query.name = {
                contains: value,
                mode: 'insensitive',
              }
            }
            break
          default:
            break
        }
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.class.findMany({
        where: query,
        include: {
          supervisor: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
      }),

      prisma.class.count({
        where: query,
      }),
    ])

    return (
      <div className='flex-1 p-4 m-4 mt-0 bg-white rounded-md'>
        {/* TOP */}
        <div className='flex justify-between'>
          <h1 className='hidden text-lg font-semibold md:block'>All Classes</h1>
          <div className='flex flex-col items-center w-full gap-4 md:w-auto md:flex-row'>
            <TableSearch />
            <div className='flex items-center self-end gap-4'>
              <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
                <Image src='/filter.png' alt='' width={14} height={14} />
              </button>
              <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
                <Image src='/sort.png' alt='' width={14} height={14} />
              </button>
              {role === 'admin' && <FormModal table='class' type='create' />}
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

export default ClassesListPage

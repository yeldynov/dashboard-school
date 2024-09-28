import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, parentsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Student Names',
    accessor: 'students',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Phone',
    accessor: 'phone',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Address',
    accessor: 'address',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const ParentsListPage = () => {
  const renderRow = (item: Parent) => {
    return (
      <tr
        key={item.id}
        className='text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
      >
        <td className='flex items-center gap-4 p-4'>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{item.name}</h3>
            <p className='text-xs text-gray-500'>{item.email}</p>
          </div>
        </td>
        <td className='hidden md:table-cell'>{item.students.join(', ')}</td>
        <td className='hidden md:table-cell'>{item.phone}</td>
        <td className='hidden md:table-cell'>{item.address}</td>
        <td>
          <div className='flex items-center gap-2'>
            <Link href={`/list/teachers/${item.id}`}>
              <button className='flex items-center justify-center rounded-full w-7 h-7 bg-lamaSky'>
                <Image src='/edit.png' alt='' width={16} height={16} />
              </button>
            </Link>
            {role === 'admin' && (
              <button className='flex items-center justify-center rounded-full w-7 h-7 bg-lamaPurple'>
                <Image src='/delete.png' alt='' width={16} height={16} />
              </button>
            )}
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className='flex-1 p-4 m-4 mt-0 bg-white rounded-md'>
      {/* TOP */}
      <div className='flex justify-between'>
        <h1 className='hidden text-lg font-semibold md:block'>All Parents</h1>
        <div className='flex flex-col items-center w-full gap-4 md:w-auto md:flex-row'>
          <TableSearch />
          <div className='flex items-center self-end gap-4'>
            <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
              <Image src='/filter.png' alt='' width={14} height={14} />
            </button>
            <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
              <Image src='/sort.png' alt='' width={14} height={14} />
            </button>
            {role === 'admin' && (
              <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
                <Image src='/plus.png' alt='' width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={parentsData} />
      {/* Pagination */}
      <Pagination />
    </div>
  )
}

export default ParentsListPage

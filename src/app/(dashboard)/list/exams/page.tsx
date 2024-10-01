import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, examsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
    header: 'Date',
    accessor: 'date',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
]

const ExamsListPage = () => {
  const renderRow = (item: Exam) => {
    return (
      <tr
        key={item.id}
        className='text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
      >
        <td className='flex items-center gap-4 p-4'>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{item.subject}</h3>
          </div>
        </td>
        <td>{item.class}</td>
        <td className='hidden md:table-cell'>{item.teacher}</td>
        <td className='hidden md:table-cell'>{item.date}</td>
        <td>
          <div className='flex items-center gap-2'>
            {role === 'admin' && (
              <>
                <FormModal table='exam' type='update' data={item} />
                <FormModal table='exam' type='delete' id={item.id} />
              </>
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
        <h1 className='hidden text-lg font-semibold md:block'>All Exams</h1>
        <div className='flex flex-col items-center w-full gap-4 md:w-auto md:flex-row'>
          <TableSearch />
          <div className='flex items-center self-end gap-4'>
            <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
              <Image src='/filter.png' alt='' width={14} height={14} />
            </button>
            <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
              <Image src='/sort.png' alt='' width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal table='exam' type='create' />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={examsData} />
      {/* Pagination */}
      <Pagination />
    </div>
  )
}

export default ExamsListPage

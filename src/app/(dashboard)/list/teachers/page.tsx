import FormModal from '@/components/FormModal'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, teachersData } from '@/lib/data'
import prisma from '@/lib/prisma'
import { Class, Subject, Teacher } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] }

const columns = [
  {
    header: 'Info',
    accessor: 'info',
  },
  {
    header: 'Teacher ID',
    accessor: 'teacherId',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Subjects',
    accessor: 'subjects',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Classes',
    accessor: 'classes',
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

const renderRow = (item: TeacherList) => {
  return (
    <tr
      key={item.id}
      className='text-sm border-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight'
    >
      <td className='flex items-center gap-4 p-4'>
        <Image
          src={item.img || '/noAvatar.png'}
          alt=''
          width={40}
          height={40}
          className='object-cover w-10 h-10 rounded-full md:hidden xl:block'
        />
        <div className='flex flex-col'>
          <h3 className='font-semibold'>{item.name}</h3>
          <p className='text-xs text-gray-500'>{item?.email}</p>
        </div>
      </td>
      <td className='hidden md:table-cell'>{item.username}</td>
      <td className='hidden md:table-cell'>
        {item.subjects.map((s) => s.name).join(', ')}
      </td>
      <td className='hidden md:table-cell'>
        {item.classes.map((c) => c.name).join(', ')}
      </td>
      <td className='hidden md:table-cell'>{item.phone}</td>
      <td className='hidden md:table-cell'>{item.address}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/teachers/${item.id}`}>
            <button className='flex items-center justify-center rounded-full w-7 h-7 bg-lamaSky'>
              <Image src='/view.png' alt='' width={16} height={16} />
            </button>
          </Link>
          {role === 'admin' && (
            <FormModal table='teacher' type='delete' id={item.id} />
          )}
        </div>
      </td>
    </tr>
  )
}

const TeachersListPage = async () => {
  const data = await prisma.teacher.findMany({
    include: {
      subjects: true,
      classes: true,
    },
  })

  return (
    <div className='flex-1 p-4 m-4 mt-0 bg-white rounded-md'>
      {/* TOP */}
      <div className='flex justify-between'>
        <h1 className='hidden text-lg font-semibold md:block'>All Teachers</h1>
        <div className='flex flex-col items-center w-full gap-4 md:w-auto md:flex-row'>
          <TableSearch />
          <div className='flex items-center self-end gap-4'>
            <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
              <Image src='/filter.png' alt='' width={14} height={14} />
            </button>
            <button className='flex items-center justify-center w-8 h-8 rounded-full bg-lamaYellow'>
              <Image src='/sort.png' alt='' width={14} height={14} />
            </button>
            {role === 'admin' && <FormModal table='teacher' type='create' />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination />
    </div>
  )
}

export default TeachersListPage

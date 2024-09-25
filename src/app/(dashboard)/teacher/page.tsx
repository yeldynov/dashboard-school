import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import React from 'react'

const TeacherPage = () => {
  return (
    <div className='flex flex-col flex-1 gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full p-4 bg-white rounded-md'>
          <h1 className='text-xl font-semibold'>Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className='flex flex-col w-full gap-8 xl:w-1/3'>
        <Announcements />
      </div>
    </div>
  )
}

export default TeacherPage

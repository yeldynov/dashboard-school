import Announcements from '@/components/Announcements'
import BigCalendar from '@/components/BigCalendar'
import EventCalendar from '@/components/EventCalendar'
import React from 'react'

const StudentPage = () => {
  return (
    <div className='flex flex-col gap-4 p-4 xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full p-4 bg-white rounded-md'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className='flex flex-col w-full gap-8 xl:w-1/3'>
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  )
}

export default StudentPage

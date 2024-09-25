import React from 'react'

const announcements = [
  {
    id: 1,
    title: 'Lorem ipsum dolor',
    date: '2025-01-01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor',
    date: '2025-01-01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor',
    date: '2025-01-01',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
]

const Announcements = () => {
  return (
    <div className='p-4 bg-white rounded-md'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Announcements</h1>
        <span className='text-xs text-gray-400'>View All</span>
      </div>
      {announcements.map((ann) => (
        <div
          key={ann.id}
          className='flex flex-col gap-4 mt-4 even:bg-lamaSkyLight odd:bg-lamaYellowLight'
        >
          <div className='p-4 rounded-md '>
            <div className='flex items-center justify-between'>
              <h2 className='font-medium'>{ann.title}</h2>
              <span className='p-1 text-xs text-gray-400 bg-white rounded-md'>
                {ann.date}
              </span>
            </div>
            <p className='mt-1 text-sm text-gray-400'>{ann.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Announcements

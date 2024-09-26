import React from 'react'

const Pagination = () => {
  return (
    <div className='flex items-center justify-between p-4 text-gray-500'>
      <button
        disabled
        className='px-4 py-2 text-xs font-semibold rounded-md cursor-not-allowed bg-slate-200 disabled:opacity-50'
      >
        Prev
      </button>
      <div className='flex items-center gap-2 text-sm'>
        <button className='px-2 rounded-sm bg-lamaSky'>1</button>
        <button className='px-2 rounded-sm '>2</button>
        <button className='px-2 rounded-sm '>3</button>
        <button className='px-2 rounded-sm '>...</button>
        <button className='px-2 rounded-sm '>5</button>
      </div>
      <button className='px-4 py-2 text-xs font-semibold rounded-md cursor-not-allowed bg-slate-200 disabled:opacity-50'>
        Next
      </button>
    </div>
  )
}

export default Pagination

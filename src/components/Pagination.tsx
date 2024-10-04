'use client'

import { ITEM_PER_PAGE } from '@/lib/settings'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter()

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', newPage.toString())
    router.push(`${window.location.pathname}?${params}`)
  }

  return (
    <div className='flex items-center justify-between p-4 text-gray-500'>
      <button
        disabled={!hasPrev}
        className='px-4 py-2 text-xs font-semibold rounded-md cursor-pointer bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={() => changePage(page - 1)}
      >
        Prev
      </button>
      <div className='flex items-center gap-2 text-sm'>
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1
            return (
              <button
                key={index}
                className={`px-2 rounded-sm ${
                  page === pageIndex ? 'bg-lamaSky' : ''
                }`}
                onClick={() => changePage(pageIndex)}
              >
                {pageIndex}
              </button>
            )
          }
        )}
      </div>
      <button
        disabled={!hasNext}
        className='px-4 py-2 text-xs font-semibold rounded-md cursor-pointer bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination

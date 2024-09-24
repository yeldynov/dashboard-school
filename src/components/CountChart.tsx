'use client'
import Image from 'next/image'
import React, { PureComponent } from 'react'
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'Total',
    count: 100,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 50,
    fill: '#fae27c',
  },
  {
    name: 'Boys',
    count: 50,
    fill: '#c3ebfa',
  },
]

const CountChart = () => {
  return (
    <div className='w-full h-full p-4 bg-white rounded-xl'>
      {/* TITLE */}
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Students</h1>
        <Image src='/moreDark.png' alt='' width={20} height={20} />
      </div>
      {/* CHART */}
      <div className='w-full relative h-[75%]'>
        <ResponsiveContainer>
          <RadialBarChart
            cx='50%'
            cy='50%'
            innerRadius='40%'
            outerRadius='100%'
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey='count' />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src='/maleFemale.png'
          alt=''
          width={50}
          height={50}
          className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
        />
      </div>
      {/* BOTTOM */}
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 rounded-full bg-lamaSky' />
          <h1 className='font-bold'>1,234</h1>
          <h2 className='text-xs text-gray-300'>Boys (55%)</h2>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 rounded-full bg-lamaYellow' />
          <h1 className='font-bold'>1,234</h1>
          <h2 className='text-xs text-gray-300'>Girls (45%)</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChart

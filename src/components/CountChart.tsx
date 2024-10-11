'use client'
import Image from 'next/image'
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: 'Total',
      count: boys + girls,
      fill: 'white',
    },
    {
      name: 'Girls',
      count: girls,
      fill: '#fae27c',
    },
    {
      name: 'Boys',
      count: boys,
      fill: '#c3ebfa',
    },
  ]

  return (
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
  )
}

export default CountChart

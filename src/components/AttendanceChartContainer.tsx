import prisma from '@/lib/prisma'
import AttendanceChart from './AttendanceChart'
import Image from 'next/image'

const AttendanceChartContainer = async () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  const lastMonday = new Date(today)

  lastMonday.setDate(today.getDate() - daysSinceMonday)

  console.log(dayOfWeek)

  const responseData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  })

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    }

  responseData.forEach((item) => {
    const itemDate = new Date(item.date)

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1]

      if (item.present) {
        attendanceMap[dayName].present += 1
      } else {
        attendanceMap[dayName].absent += 1
      }
    }
  })

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }))

  return (
    <div className='h-full p-4 bg-white rounded-lg'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Attendance</h1>
        <Image src='/moreDark.png' alt='' width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  )
}

export default AttendanceChartContainer

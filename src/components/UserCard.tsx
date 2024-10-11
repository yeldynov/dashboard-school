import prisma from '@/lib/prisma'
import Image from 'next/image'

const UserCard = async ({
  type,
}: {
  type: 'admin' | 'teacher' | 'student' | 'parent'
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  }

  const data = await modelMap[type].count()

  return (
    <div className='flex-1 p-4 rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow min-w-[130px]'>
      <div className='flex items-center justify-between'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600'>
          2024/25
        </span>
        <Image src='/more.png' alt='' width={20} height={20} />
      </div>
      <h1 className='my-4 text-2xl font-semibold'>{data}</h1>
      <h2 className='text-sm font-medium text-gray-500'>{type}s</h2>
    </div>
  )
}

export default UserCard

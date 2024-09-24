import CountChart from '@/components/CountChart'
import UserCard from '@/components/UserCard'

const AdminPage = () => {
  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row'>
      {/* left  */}
      <div className='flex flex-col w-full gap-8 lg:w-2/3'>
        {/* user cards */}
        <div className='flex flex-wrap justify-between gap-4'>
          <UserCard type='Student' />
          <UserCard type='Teacher' />
          <UserCard type='Parent' />
          <UserCard type='Staff' />
        </div>
        {/* Middle charts */}
        <div className='flex flex-col gap-4 lg:flex-row'>
          {/* COUNT CHART */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart />
          </div>
          {/* ATTENDANCE CHART  */}
          <div className='w-full lg:w-2/3 h-[450px]'></div>
        </div>
        {/* bottom chart */}
        <div className=''></div>
      </div>
      {/* right */}
      <div className='w-full lg:w-1/3'>rr</div>
    </div>
  )
}

export default AdminPage

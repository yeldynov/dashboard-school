import Menu from '@/components/Menu'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen'>
      {/* LEFT */}
      <div className='w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4'>
        <Link
          className='flex items-center justify-center md:justify-start'
          href='/'
        >
          <Image src='/logo.png' alt='logo' width={80} height={32} />
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className='w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

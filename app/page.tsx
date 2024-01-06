
import { getServerSession } from 'next-auth'

import { authOptions } from './api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import Signout from '@/component/Signout';


export default async function Home() {
  const session=await getServerSession(authOptions);
  if(!session)
  {
    redirect('/login');
  }
  return (
    <main className=' flex p-2 flex-col justify-center items-center w-full h-screen'>
      <h1 className=' text-xl md:text-3xl font-bold text-blue-800'>Hello <span className=' md:text-2xl text-sm text-green-700'>{session.user?.name?.toLocaleUpperCase()}.</span> This is home page.</h1>
      <Signout/>
    </main>
  )
}

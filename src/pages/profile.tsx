import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import SideMenu from './components/sideMenu';

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <div className='flex justify-center items-center h-screen bg-slate-800'>
      <SideMenu />
      <div className='bg-white rounded-lg shadow-md p-8'>
        <div className='flex items-center space-x-8'>
          <Image
            className='w-64 h-64 rounded-full'
            src={session?.user?.image || ''}
            alt=''
            width={256}
            height={256}
          />
          <div className='flex flex-col'>
            <p className='text-2xl font-bold'>{session?.user?.name}</p>
            <p className='text-lg'>{session?.user?.email}</p>
          </div>
        </div>
      </div>
      <button className='fixed top-20 right-0 flex items-center px-10 py-2 bg-blue-500 text-white text-sm font-bold rounded-md cursor-pointer transition duration-300' onClick={() => signOut({ redirect: true, callbackUrl: '/'})}>
          Sign out
      </button> 
    </div>
  );
};

export default ProfilePage;

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const SideMenu = () => {
  const { data: session } = useSession();

  return (
    <><nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-3 py-3 lg:px-5 lg:pl-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start'>
          </div>
          <div className='flex items-center'>
            <div className='flex items-center ml-3'>
              <div>
                <button type='button' className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600' aria-expanded='false' data-dropdown-toggle='dropdown-user'>
                  <span className='sr-only'>Open user menu</span>
                  <Link href={'/profile'}>
                    <Image className='w-8 h-8 rounded-full' height={8} width={8} src={session?.user?.image!} alt='user photo' />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav><aside id='logo-sidebar' className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700' aria-label='Sidebar'>
      <div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
          <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path clip-rule='evenodd' fill-rule='evenodd' d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'></path>
          </svg>
          <Link className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700' href={'/'}> Home </Link>
        </ul>
      </div>
    </aside>
    </>
  );
};

export default SideMenu;

import Image from 'next/image';
export default function Custom404() {
  return (
    <main className='flex flex-col items-center text-white p-24 min-h-screen bg-slate-800'>
      <h1 className='text-3xl font-calibri py-2'>Whoops not found</h1>
      <Image src={'/404.svg'} height={1000} width={1000} alt='Image'/>
    </main>
  );
}
  
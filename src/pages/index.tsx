import { useSession, signIn } from 'next-auth/react';
import CreatePostPage from './components/createPosts';
import PostList from './components/getPosts';
import SideMenu from './components/sideMenu';

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <main className='flex flex-col items-center text-white p-24 min-h-screen bg-slate-800'>
        <SideMenu />
        <p className='text-3xl font-calibri  py-2'>{`Oi, what's up ${session.user?.name}`}</p>
        <CreatePostPage />
        <PostList />
      </main>
    );
  } else {
    return (
      <main className='flex flex-col items-center text-white p-24 min-h-screen bg-slate-800'>
        <div className='text-3xl font-calibri  py-2'>Have you tried signing in?</div>
        <button className='flex items-center px-10 py-2 bg-blue-500 text-white text-sm font-bold rounded-md cursor-pointer transition duration-300'  onClick={() => signIn('google', { callbackUrl: '/ ' })}>
          Sign in
        </button>
      </main>
    );
  }
}

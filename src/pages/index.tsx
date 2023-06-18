import { useSession } from 'next-auth/react';
import CreatePostPage from './components/createPosts';
import PostList from './components/getPosts';
import SideMenu from './components/sideMenu';
import SignIn from './signin';

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
        <SignIn />
      </main>
    );
  }
}

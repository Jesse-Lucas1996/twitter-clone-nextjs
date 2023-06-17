import { useSession, signIn, signOut } from "next-auth/react";
import CreatePostPage from "./components/createPosts";
import PostList from "./components/getPosts";
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()
  if (session) {
    return (
      <main className="flex flex-col items-center text-white p-24 min-h-screen bg-slate-800">
        <p className="text-3xl font-calibri  py-2">{`Oi, what's up ${session.user?.name}`}</p>
        <button className="fixed top-0 right-0 flex items-center px-10 py-2 bg-blue-500 text-white text-sm font-bold rounded-md cursor-pointer transition duration-300" onClick={() => signOut()}>
          Sign out
        </button>
        <button className="fixed top-0 left-0 flex items-center px-10 py-2 bg-blue-500 text-white text-sm font-bold rounded-md cursor-pointer transition duration-300" onClick={() => router.push('/profile')}>
         Profile
        </button>
        <CreatePostPage />
        <PostList />
      </main>
    );
  } else {
    return (
      <main className="flex flex-col items-center text-white p-24 min-h-screen bg-slate-800">
        <div className="text-3xl font-calibri  py-2">Have you tried signing in?</div>
        <button className="flex items-center px-10 py-2 bg-blue-500 text-white text-sm font-bold rounded-md cursor-pointer transition duration-300"  onClick={() => signIn("google", { callbackUrl: "/ " })}>
          Sign in
        </button>
      </main>
    );
  }
}

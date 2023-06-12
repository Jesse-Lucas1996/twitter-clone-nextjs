import styles from '@/styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import CreatePostPage from './components/posts';
import PostList  from './components/getPosts';

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <main className={styles.container}>
        <div className={styles.title}> text goes here </div>
        <div className={styles.content}> content goes here </div>
        <button className={styles.signin} onClick={() => signOut()}>Sign out</button>
      </main>
    );
  } else {
    return (
      <main className={styles.container}>
      <button className={styles.signin} onClick={() => signOut()}>Sign out</button>
      <CreatePostPage />
      <div style={{ marginBottom: '16px' }}></div> {/* Add this div for spacing */}
      <PostList />
    </main>
    );
  }
}

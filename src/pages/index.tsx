import styles from '@/styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';

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
   
        <div className={styles.main}>Not signed in </div>
        <button className={styles.signin} onClick={() => signIn()}>Sign in</button>
      </main>
    );
  }
}

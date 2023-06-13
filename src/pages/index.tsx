import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import CreatePostPage from "./components/createPosts";
import PostList from "./components/getPosts";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <main className={styles.container}>
        <p>Oi whats up {session.user?.name}</p>
        <button className={styles.signin} onClick={() => signOut()}>
          Sign out
        </button>
        <CreatePostPage />
        <PostList />
      </main>
    );
  } else {
    return (
      <main className={styles.container}>
        <div className={styles.title}>Have you tried signing in on the top right?</div>
        <button className={styles.signin} onClick={() => signIn("google", { callbackUrl: "/ " })}>
          Sign in
        </button>
      </main>
    );
  }
}

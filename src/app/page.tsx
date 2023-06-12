import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.title}> text goes here </div>
      <div className={styles.content}> content goes here </div>
    </main>
  )
}

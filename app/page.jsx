import Link from 'next/link';
import styles from './ui/page.module.css';

export default function Home () {
  return (
    <main className={styles.main}>
      <Link className={styles.link} href="/exercise1">Exercise 1</Link>
      <Link className={styles.link} href="/exercise2">Exercise 2</Link>
    </main>
  );
}

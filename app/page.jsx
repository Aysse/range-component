'use client';

import Range from './ui/Range.jsx';
import styles from './ui/page.module.css';

export default function Home () {
  return (
    <main className={styles.main}>
      <Range min={1} max={10000} currency={'€'} />
      <Range fixedValue={[5, 10, 15, 20]} currency={'€'} />
    </main>
  );
}

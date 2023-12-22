'use client';
import { useEffect, useState } from 'react';
import Range from './ui/Range.jsx';
import styles from './ui/page.module.css';

export default function Home () {
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('http://demo6854671.mockable.io/minMaxValues')
      .then((res) => res.json())
      .then((data) => {
        setMin(data.min);
        setMax(data.max);

        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!isLoaded) {
    return (
      <main className={styles.main}>
        <div className={styles.loader}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </main>
    );
  }

  return (
    /* TODO: Try Range as a server Component and use Suspense to render a skeleton */
    <main className={styles.main}>
      <Range min={min} max={max} currency={'€'} />
      <Range fixedValues={[5, 10, 15, 20]} currency={'€'} />
    </main>
  );
}

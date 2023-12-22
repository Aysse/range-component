'use client';
import { useEffect, useState } from 'react';
import Range from '../ui/Range.jsx';
import styles from '../ui/page.module.css';

export default function Home () {
  const [fixedValues, setFixedValues] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('https://demo6854671.mockable.io/fixedValues')
      .then((res) => res.json())
      .then((data) => {
        setFixedValues(data.rangeValues);

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
    <main className={styles.exercise}>
      <Range fixedValues={fixedValues} currency={'€'} />
    </main>
  );
}

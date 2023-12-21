import React, { useState, useRef, useEffect } from 'react';
import styles from './range.module.css';

export default function Range({ min, max, fixedValue, currency }) {
  const [minValue, setMinValue] = useState(Math.floor(min));
  const [maxValue, setMaxValue] = useState(Math.ceil(max));
  const [dragging, setDragging] = useState(null);
  const rangeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const rect = rangeRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const minRange = min;
    const maxRange = max;
    let newValue = minRange + percentage * (maxRange - minRange);

    if (dragging === 'min') {
      newValue = Math.min(Math.floor(newValue), maxValue - 1);
    } else if (dragging === 'max') {
      newValue = Math.max(Math.ceil(newValue), minValue + 1);
    }

    newValue = Math.min(Math.max(newValue, minRange), maxRange);

    if (dragging === 'min') {
      setMinValue(newValue);
    } else if (dragging === 'max') {
      setMaxValue(newValue);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, min, max, minValue, maxValue]);

  const handleMouseDown = (bullet) => {
    setDragging(bullet);
  };

  const handleValueChange = (e, label) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      if (label === 'min') {
        setMinValue(newValue);
      } else if (label === 'max') {
        setMaxValue(newValue);
      }
    }
  };

  return (
    <div data-testid='container' className={styles.container}>
      <div className={styles.labelsContainer}>
        <input
          aria-label='min'
          className={styles.inputContainer}
          value={minValue}
          type='text'
          onChange={(e) => handleValueChange(e, 'min')}
        />
        <span className={styles.currency}>{currency}</span>
      </div>
      <div className={styles.rangeContainer}>
        <div className={styles.range} ref={rangeRef}>
          <div
            className={styles.rangeFill}
            style={{
              left: `${((minValue - min) / (max - min)) * 100}%`,
              width: `${((maxValue - minValue) / (max - min)) * 100}%`
            }}
          />
          <div
            data-testid='min-bullet'
            className={`${styles.bullet} ${styles.minBullet}`}
            style={{ left: `${((minValue - min) / (max - min)) * 100}%` }}
            onMouseDown={() => handleMouseDown('min')}
          />
          <div
            data-testid='max-bullet'
            className={`${styles.bullet} ${styles.maxBullet}`}
            style={{ left: `${((maxValue - min) / (max - min)) * 100}%` }}
            onMouseDown={() => handleMouseDown('max')}
          />
        </div>
      </div>
      <div className={styles.labelsContainer}>
        <input
          aria-label='max'
          className={styles.inputContainer}
          value={maxValue}
          type='text'
          onChange={(e) => handleValueChange(e, 'max')}
        />
        <span className={styles.currency}>{currency}</span>
      </div>
    </div>
  );
}

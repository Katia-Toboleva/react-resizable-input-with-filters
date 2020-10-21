import React from 'react';
import styles from './scale.scss';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Scale = () => (

  <div className={styles['scale']}>
    {arr.map((num) => (
      <div key={num} className={styles['scale__item']} />
    ))}
  </div>
);

export default Scale;

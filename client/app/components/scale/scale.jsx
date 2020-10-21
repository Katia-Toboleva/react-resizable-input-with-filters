import React from 'react';
import styles from './scale.scss';

const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];

const stylesScale = {
  width: `${100 / arr.length}%`,
};

const Scale = () => (

  <div className={styles['scale']}>
    {arr.map((num) => (
      <div key={num} className={styles['scale__item']} style={stylesScale} />
    ))}
  </div>
);

export default Scale;

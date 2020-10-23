import React from 'react';
import styles from './scale.scss';

const getStyles = (spaces) => ({
  width: `${spaces}%`,
});

const Scale = (props) => {
  const { spaces } = props;
  return (
    <div className={styles['scale']}>
      {[...Array(100 / spaces)].map((item, index) => (
        <div key={index} className={styles['scale__item']} style={getStyles(spaces)} />
      ))}
    </div>
  );
};

export default Scale;

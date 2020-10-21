import React from 'react';
import styles from './bar.scss';

const Bar = (props) => {
  const {
    right,
    left,
    type,
    onMouseDown,
    width,
  } = props;

  const barLeftAndRightStyles = {
    left: `${left}px`,
    right: `${right}px`,
    width: `${width}%`,
  };

  const handleMouseDown = (event) => {
    const x1 = event.clientX;
    onMouseDown(type, x1);
  };

  return (
    <div
      type={type}
      className={styles['range-input-bar']}
      style={barLeftAndRightStyles}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Bar;

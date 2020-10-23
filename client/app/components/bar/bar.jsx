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
    left: `${left}%`,
    right: `${right}%`,
    width: `${width}%`,
  };

  const handleMouseDown = () => {
    onMouseDown(type);
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

import React from 'react';
import styles from './toggle.scss';

const Toggle = (props) => {
  const {
    type, onMouseUp, onMouseDown, onMouseMove, right, left,
  } = props;

  const handleMouseMove = (event) => {
    const valueX = event.screenX;
    onMouseMove(valueX);
  };

  const handleMouseDown = () => {
    onMouseDown(type);
  };

  const handleMouseUp = () => {
    onMouseUp();
  };

  const toggleLeftAndRightStyles = {
    left: `${left}px`,
    right: `${right}px`,
  };

  return (
    <div
      type={type}
      className={styles.toggle}
      style={toggleLeftAndRightStyles}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

export default Toggle;

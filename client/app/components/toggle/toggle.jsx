import React from 'react';
import styles from './toggle.scss';

const Toggle = (props) => {
  const { value, onMouseUp, onMouseDown , onMouseMove } = props;


  const handleMouseMove = (event) => {
    console.log(event);
    onMouseMove(value)
  }


  const handleMouseDown = () => {
    onMouseDown(value)
  }

  const handleMouseUp = () => {
    onMouseUp(value)
  }

  return (
    <div className={styles.toggle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
    </div>
  )
};

export default Toggle;

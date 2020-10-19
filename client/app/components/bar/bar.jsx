import React from 'react';
import styles from './bar.scss';

const Bar = (props) => {
  const {right, left } = props;

  const barLeftAndRightStyles = {
    left: `${left}px`,
    right: `${right}px`
  }

  return(
    <div
      className={styles['range-input-bar']}
      style={barLeftAndRightStyles}
    />
  )

}

export default Bar;

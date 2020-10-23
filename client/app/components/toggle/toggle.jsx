import React from 'react';
import classnames from 'classnames/bind';
import styles from './toggle.scss';

const cx = classnames.bind(styles);

const Toggle = (props) => {
  const {
    type, onMouseDown, right, left,
  } = props;

  const handleMouseDown = () => {
    onMouseDown(type);
  };

  const toggleLeftAndRightStyles = {
    left: `${left}%`,
    right: `${right}%`,
  };

  return (
    <div
      type={type}
      className={cx('toggle', {
        [`toggle--type-${type}`]: true,
      })}
      style={toggleLeftAndRightStyles}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Toggle;

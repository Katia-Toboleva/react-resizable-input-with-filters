import React from 'react';
import classnames from 'classnames/bind';
import styles from './bar.scss';

const cx = classnames.bind(styles);

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

  const getClassnames = () => cx('range-input-bar', {
    'range-input-bar--gradient-blue-red': width <= 10 || width > 50 && width <= 60,
    'range-input-bar--gradient-green-yellow': width > 10 && width <= 20 || width > 60 && width <= 70,
    'range-input-bar--gradient-orange-red': width > 20 && width <= 30 || width > 70 && width <= 80,
    'range-input-bar--gradient-purple-pink': width > 30 && width <= 40 || width > 80 && width <= 90,
    'range-input-bar--gradient-yellow-blue': width > 40 && width <= 50 || width > 90 && width < 100,
  });

  return (
    <div
      type={type}
      className={getClassnames()}
      style={barLeftAndRightStyles}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Bar;

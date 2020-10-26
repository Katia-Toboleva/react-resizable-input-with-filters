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
    // background: `linear-gradient(90deg, rgb(2${left}, 1${left}, ${left}), rgb(${right}, 1${right}, 2${right}))`,
  };

  const handleMouseDown = () => {
    onMouseDown(type);
  };

  const getClassnames = () => cx('range-input-bar', {
    'range-input-bar--gradient-blue-red': left === 10 || right === 10,
    'range-input-bar--gradient-green-yellow': left === 20 || right === 20,
    'range-input-bar--gradient-orange-red': left === 30 || right === 30,
    'range-input-bar--gradient-purple-pink': left === 40 || right === 40,
    'range-input-bar--gradient-yellow-blue': left === 50 || right === 50,
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

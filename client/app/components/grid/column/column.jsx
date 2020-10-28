import React from 'react';
import classnames from 'classnames/bind';
import styles from './column.scss';

const cx = classnames.bind(styles);

const Column = (props) => {
  const {
    children,
    grow,
    shrink,
    flex,
  } = props;

  return (
    <div
      className={cx('grid-item', {
        'grid-item--grow': grow,
        'grid-item--shrink': shrink,
        [`grid-item--flex-${flex}`]: flex,
      })}
    >
      {children}
    </div>
  );
};

export default Column;

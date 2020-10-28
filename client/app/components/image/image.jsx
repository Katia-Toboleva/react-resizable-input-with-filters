import React from 'react';
import classnames from 'classnames/bind';
import styles from './image.scss';

const cx = classnames.bind(styles);

const Image = (props) => {
  const { size, url } = props;
  return (
    <div className={cx('image', {
      [`image--size-${size}`]: size,
    })}
    >
      <img src={String(url)} alt="hotel" />

    </div>
  );
};

export default Image;

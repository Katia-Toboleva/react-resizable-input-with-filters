import React from 'react';
import classnames from 'classnames/bind';
import styles from './tooltip.scss';

const cx = classnames.bind(styles);

const Tooltip = (props) => {
  const {
    type, active, text,
  } = props;

  return (
    <div
      className={cx('tooltip', {
        [`tooltip--type-${type}`]: type,
        'tooltip--active': active,
      })}
    >
      <span className={styles['tooltip__text']}>
        {text}
      </span>
    </div>

  );
};

export default Tooltip;

import React from 'react';
import classnames from 'classnames/bind';
import styles from './tooltip.scss';

const cx = classnames.bind(styles);

const Tooltip = (props) => {
  const {
    type, right, left, active, text,
  } = props;

  const tooltipStyles = {
    left: `${left}%`,
    right: `${right}%`,
  };

  return (
    <div
      type={type}
      className={cx('tooltip', {
        [`tooltip--type-${type}`]: type,
        'tooltip--active': active,
      })}
      style={tooltipStyles}
    >
      <span className={styles['tooltip__text']}>
        {text}
      </span>
    </div>

  );
};

export default Tooltip;

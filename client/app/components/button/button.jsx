import React from 'react';
import classnames from 'classnames/bind';
import styles from './button.scss';
import Text from '../text';

const cx = classnames.bind(styles);

const Button = ({ text, type }) => (
  <div className={cx('button', {
    [`button--${type}`]: type,
  })}
  >
    <Text text={text} upper />
  </div>
);

export default Button;

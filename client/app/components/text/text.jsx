import React from 'react';
import classnames from 'classnames/bind';
import styles from './text.scss';

const cx = classnames.bind(styles);

const Text = (props) => {
  const {
    bold, upper, theme, text,
  } = props;

  return (
    <div className={cx('text', {
      'text--bold': bold,
      'text--upper': upper,
      [`text--theme-${theme}`]: theme,
    })}
    >
      {text}
    </div>
  );
};

export default Text;

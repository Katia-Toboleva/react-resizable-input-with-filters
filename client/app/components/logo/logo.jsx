import React from 'react';
import styles from './logo.scss';
import Image from '../image';

const logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/W_Hotels_Logo.svg/800px-W_Hotels_Logo.svg.png';

const Logo = () => (
  <div className={styles.logo}>
    <Image size="small" url={logo} />
  </div>
);

export default Logo;

import React from 'react';
import styles from './navbar.scss';
import Button from '../button';

const Navbar = () => (
  <ul className={styles.navbar}>
    <li>
      <Button text="deals" type="nav" />
    </li>
    <li>
      <Button text="help" type="nav" />
    </li>
    <li>
      <Button text="sign in" type="nav" />
    </li>
  </ul>
);

export default Navbar;

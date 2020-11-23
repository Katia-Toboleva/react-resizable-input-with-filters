import React from 'react';
import styles from './header.scss';
import { Row, Column } from '../grid';
import Navbar from '../navbar';
import Logo from '../logo';

const Header = () => (
  <div className={styles.header}>
    <Row direction="row">
      <Column grow>
        <Logo />
      </Column>
      <Column shrink>
        <Navbar />
      </Column>
    </Row>
  </div>
);

export default Header;

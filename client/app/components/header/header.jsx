import React from 'react';
import styles from './header.scss';
import { Row, Column } from '../grid';
import { Logo } from '../logo';

const Header = () => (
  <div className={styles.header}>
    <Row>
      <Column>
        <Logo />
      </Column>
    </Row>
  </div>
);

export default Header;

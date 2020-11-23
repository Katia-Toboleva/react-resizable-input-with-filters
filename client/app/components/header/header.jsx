import React from 'react';
import styles from './header.scss';
import { Row, Column } from '../grid';
import Button from '../button';
import Logo from '../logo';

const Header = () => (
  <div className={styles.header}>
    <Row direction="row" position="space-between">
      <Column>
        <div className={styles['header__nav']}>
          <Button text="home" type="nav" />
          <Button text="about" type="nav" />
        </div>
      </Column>
      <Column>
        <Logo />
      </Column>
      <Column>
        <div className={styles['header__nav']}>
          <Button text="sign in" type="nav" />
          <Button text="deals" type="nav" />
        </div>
      </Column>
    </Row>
  </div>
);

export default Header;

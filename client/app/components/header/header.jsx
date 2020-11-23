import React from 'react';
import styles from './header.scss';
import { Row, Column } from '../grid';
import Button from '../button';
import Logo from '../logo';

const Header = () => (
  <div className={styles.header}>
    <Row direction="row">
      <Column>
        {/* <Navbar /> */}
      </Column>
      <Column grow >
        <Logo />
      </Column>
      <Column>
        <Button text="sign in" type="sign-in" />
      </Column>
    </Row>
  </div>
);

export default Header;

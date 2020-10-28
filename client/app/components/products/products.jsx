import React from 'react';
import styles from './products.scss';
import { Row, Column } from '../grid';

const Products = (props) => {
  const { items } = props;
  // console.log(props);
  return (
    <div className={styles['products']}>
      {items.map((product) => (
        <Row direction="row">
          <Column grow>
            <div className={styles['products__name']}>
              {product.name}
            </div>
          </Column>
          <Column shrink>
            <div className={styles['products__price']}>
              {`£${product.price}`}
            </div>
          </Column>
        </Row>
      ))}


    </div>

  );
};

export default Products;

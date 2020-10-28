import React from 'react';
import styles from './products.scss';
import { Row, Column } from '../grid';

const Products = (props) => {
  const { items } = props;
  // console.log(props);
  return (
    <div className={styles['products']}>
      {items.map((product, index) => (
        <div className={styles['products__item']} key={index}>
          <Row direction="row" position="space-between">
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
        </div>

      ))}


    </div>

  );
};

export default Products;

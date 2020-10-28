import React from 'react';
import styles from './products.scss';
import { Row, Column } from '../grid';
import Image from '../image';

const Products = (props) => {
  const { items } = props;
  // console.log(props);
  return (
    <div className={styles['products']}>
      {items.map((product, index) => (
        <div className={styles['products__item']} key={index}>
          <Row direction="row">
            <Column grow flex="2">
              <div className={styles['products__name']}>
                {product.name}
              </div>
            </Column>
            <Column grow flex="2">
              <div className={styles['products__image']}>
                <Image url={product.url} size="medium" />
              </div>
            </Column>
            <Column shrink flex="1">
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

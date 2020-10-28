import React from 'react';
import styles from './products.scss';
import { Row, Column } from '../grid';
import Image from '../image';
import Text from '../text';

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
                <Text text={product.name} theme="dark-blue" />
              </div>
            </Column>
            <Column grow flex="2">
              <div className={styles['products__image']}>
                <Image url={product.url} size="medium" />
              </div>
            </Column>
            <Column shrink flex="1" >
              <div className={styles['products__price']}>
                <Text text={`£${product.price}`} theme="brick" size="big" />
                <Text text="per night" />
              </div>
            </Column>
          </Row>
        </div>

      ))}


    </div>

  );
};

export default Products;

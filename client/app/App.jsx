import React from 'react';
import RangeInput from './components/range-input';
import Products from './components/products';
import { Row, Column } from './components/grid';
import styles from './reset.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceRange: {
        min: '',
        max: '',
      },
      products: [
        {
          name: 'Mornington Hotel London Victoria',
          price: 50,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/20000/14300/14264/7d872231_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'Merit Kensington Hotel',
          price: 60,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/30000/28600/28508/00b600ec_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'Holiday Inn London',
          price: 75,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/30000/20200/20124/bc169fd5_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'DoubleTree by Hilton London',
          price: 83,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'Marlin Aldgate Tower Bridge',
          price: 93,
          url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'The Chesterfield Mayfair',
          price: 123,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'The Zetter Townhouse Marylebone',
          price: 172,
          url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'The Bloomsbury',
          price: 185,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/2300/2276/ca632b05_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'Firmdale Hotel',
          price: 195,
          url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
        {
          name: 'Grand Residences by Marriott',
          price: 250,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
        },
      ],
    };

    this.handleRangeInputChange = this.handleRangeInputChange.bind(this);
    // this.handleInputValueChange = this.handleMinInputValueChange.bind(this);
    this.getMinPrice = this.getMinPrice.bind(this);
    this.getMaxPrice = this.getMaxPrice.bind(this);
  }

  getMinPrice() {
    const { products } = this.state;
    const minPrice = Math.min(...products.map((item) => item.price));

    return minPrice;
  }

  getMaxPrice() {
    const { products } = this.state;
    const maxPrice = Math.max(...products.map((item) => item.price));

    return maxPrice;
  }

  getItems() {
    const { priceRange, products } = this.state;

    if (priceRange.min === '' || priceRange.max === '') {
      return products;
    }

    return this.filteredProducts();
  }

  filteredProducts() {
    const { priceRange, products } = this.state;

    const filteredProducts = products.filter((product) => {
      if (product.price >= priceRange.min && product.price <= priceRange.max) {
        return product;
      }

      return false;
    });

    return filteredProducts;
  }

  handleRangeInputChange(values) {
    const minPrice = this.getMinPrice();
    const maxPrice = this.getMaxPrice();
    const fullRangeValue = maxPrice - minPrice;
    const stepLeftValue = (values.left * fullRangeValue) / 100;
    const stepRightValue = (values.right * fullRangeValue) / 100;

    this.setState({
      priceRange: {
        min: minPrice + stepLeftValue,
        max: maxPrice - stepRightValue,
      },
    });
  }

  // handleMinInputValueChange(event) {
  //   this.setState({
  //     priceRange: {
  //       min: event.currentTarget.value,
  //     },
  //   });
  // }

  render() {
    const { priceRange } = this.state;
    const items = this.getItems();

    return (
      <>
        <Row position="center">
          <RangeInput
            onChange={this.handleRangeInputChange}
            min={priceRange.min}
            max={priceRange.max}
            spaces={10}
            sticky
          />
        </Row>

        <Row direction="row" position="center">
          <Column>
            <input
              type="text"
              value={priceRange.min}
              className={styles['values-field']}
              // onChange={this.handleMinInputValueChange}
            />
          </Column>
          <Column>
            <input type="text" value={priceRange.max} className={styles['values-field']} />
          </Column>
        </Row>


        <Products items={items} />
      </>
    );
  }
}

export default App;

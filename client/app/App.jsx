import React from 'react';
import RangeInput from './components/range-input';
import Products from './components/products';
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
        },
        {
          name: 'Merit Kensington Hotel',
          price: 60,
        },
        {
          name: 'Holiday Inn London',
          price: 75,
        },
        {
          name: 'DoubleTree by Hilton London',
          price: 83,
        },
        {
          name: 'Marlin Aldgate Tower Bridge',
          price: 93,
        },
        {
          name: 'The Chesterfield Mayfair',
          price: 123,
        },
        {
          name: 'The Zetter Townhouse Marylebone',
          price: 172,
        },
        {
          name: 'The Bloomsbury',
          price: 185,
        },
        {
          name: 'Firmdale Hotel',
          price: 195,
        },
        {
          name: 'Grand Residences by Marriott',
          price: 250,
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(values) {
    this.setState({
      priceRange: {
        min: values.left,
        max: 100 - values.right,
      },
    });
  }

  filteredProducts() {
    const { priceRange, products } = this.state;

    const filteredProducts = products.filter((product) => {
      if (product.price >= priceRange.min && product.price <= priceRange.max) {
        return product;
      }
    });

    return filteredProducts;
  }

  getItems() {
    const { priceRange, products } = this.state;

    if (priceRange.min === '' || priceRange.max === '') {
      return products;
    }

    return this.filteredProducts();
  }

  render() {
    const { priceRange } = this.state;
    const items = this.getItems();

    return (
      <>
        <RangeInput onChange={this.handleChange} spaces={10} sticky />
        <br />
        <br />

        <input type="text" value={priceRange.min} className={styles['values-field']} />
        <input type="text" value={priceRange.max} className={styles['values-field']} />

        <Products items={items} />
      </>
    );
  }
}

export default App;

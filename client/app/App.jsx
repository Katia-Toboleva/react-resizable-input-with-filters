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
          address: '35 Charles St, Mayfair, London W1J 5EB',
        },
        {
          name: 'Merit Kensington Hotel',
          price: 60,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/30000/28600/28508/00b600ec_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: "12 & 24 Penywern Rd, Earl's Court, London SW5 9ST",

        },
        {
          name: 'Holiday Inn London',
          price: 75,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/30000/20200/20124/bc169fd5_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: '103-109 Southwark St, London SE1 0JQ',
        },
        {
          name: 'DoubleTree by Hilton London',
          price: 83,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: '30 John Islip St, Westminster, London SW1P 4DD',
        },
        {
          name: 'Marlin Aldgate Tower Bridge',
          price: 93,
          url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: '58 Commercial Rd, Whitechapel, London E1 1LP',
        },
        {
          name: 'The Chesterfield Mayfair',
          price: 123,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: '35 Charles St, Mayfair, London W1J 5EB',
        },
        {
          name: 'The Zetter Townhouse Marylebone',
          price: 172,
          url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: ' 28-30 Seymour St, Marylebone, London W1H 7JB',
        },
        {
          name: 'The Bloomsbury',
          price: 185,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/2300/2276/ca632b05_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: '28-30 Seymour St, Marylebone, London W1H 7JB',
        },
        {
          name: 'Firmdale Hotel',
          price: 195,
          url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: '15-17 Charlotte St, Fitzrovia, London W1T 1RJ',
        },
        {
          name: 'Grand Residences by Marriott',
          price: 250,
          url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
          address: '47 Park St, Mayfair, London W1K 7EB',
        },
      ],
      inputFieldActive: false,
    };

    this.handleRangeInputChange = this.handleRangeInputChange.bind(this);
    this.handleMinInputValueChange = this.handleMinInputValueChange.bind(this);
    this.handleMaxInputValueChange = this.handleMaxInputValueChange.bind(this);
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

  getMinInputValuePercent(fullRangeValue, minPrice) {
    const { priceRange } = this.state;
    return ((priceRange.min - minPrice) * 100) / fullRangeValue;
  }

  getMaxInputValuePercent(fullRangeValue, maxPrice) {
    const { priceRange } = this.state;
    return ((maxPrice - priceRange.max) * 100) / fullRangeValue;
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

  calculateFullRangeValue(maxPrice, minPrice) {
    return maxPrice - minPrice;
  }

  convertPercentIntoNumber(percent, totalNumber) {
    return (percent * totalNumber) / 100;
  }

  handleRangeInputChange(values) {
    // console.log(values);
    const minPrice = this.getMinPrice();
    const maxPrice = this.getMaxPrice();
    const fullRangeValue = this.calculateFullRangeValue(maxPrice, minPrice);
    const stepLeftValue = this.convertPercentIntoNumber(values.left, fullRangeValue);
    const stepRightValue = this.convertPercentIntoNumber(values.right, fullRangeValue);

    this.setState({
      priceRange: {
        min: minPrice + stepLeftValue,
        max: maxPrice - stepRightValue,
      },
    });
  }

  handleMinInputValueChange(event) {
    const minPrice = this.getMinPrice();
    const maxPrice = this.getMaxPrice();
    const { priceRange } = this.state;
    const newMin = Number(event.currentTarget.value);

    if (newMin < minPrice && priceRange.min > priceRange.max) {
      this.setState({
        inputFieldActive: false,
      });
    }

    this.setState({
      priceRange: {
        min: newMin,
        max: priceRange.max === '' ? maxPrice : priceRange.max,
      },
      inputFieldActive: true,
    });
  }

  handleMaxInputValueChange(event) {
    const minPrice = this.getMinPrice();
    const maxPrice = this.getMaxPrice();
    const { priceRange } = this.state;
    const newMax = Number(event.currentTarget.value);

    if (newMax <= maxPrice && priceRange.max > priceRange.min) {
      this.setState({
        //how do I make sure min and max are now updated with the newMax values??
        inputFieldActive: false,
      });
    }

    this.setState({
      priceRange: {
        min: priceRange.min === '' ? minPrice : priceRange.min,
        max: newMax,
      },
      inputFieldActive: true,
    });
  }

  render() {
    // console.log(this.state);
    const { priceRange, inputFieldActive } = this.state;
    const items = this.getItems();
    const minPrice = this.getMinPrice();
    const maxPrice = this.getMaxPrice();
    const fullRangeValue = this.calculateFullRangeValue(maxPrice, minPrice);
    const minInputValuePercent = this.getMinInputValuePercent(fullRangeValue, minPrice);
    const maxInputValuePercent = this.getMaxInputValuePercent(fullRangeValue, maxPrice);
    const widthInputPercent = 100 - maxInputValuePercent - minInputValuePercent;

    return (
      <>
        <Row position="center">
          <RangeInput
            min={priceRange.min === '' ? minPrice : priceRange.min}
            max={priceRange.max === '' ? maxPrice : priceRange.max}
            leftPercentFromInput={minInputValuePercent}
            rightPercentFromInput={maxInputValuePercent}
            widthInput={widthInputPercent}
            spaces={10}
            sticky
            controlledByInputField={inputFieldActive}
            onChange={this.handleRangeInputChange}
          />
        </Row>

        <Row direction="row" position="center">
          <Column>
            <input
              type="text"
              value={priceRange.min === '' ? minPrice : priceRange.min}
              className={styles['values-field']}
              onChange={this.handleMinInputValueChange}
            />
          </Column>
          <Column>
            <input
              type="text"
              value={priceRange.max === '' ? maxPrice : priceRange.max}
              className={styles['values-field']}
              onChange={this.handleMaxInputValueChange}
            />
          </Column>
        </Row>

        <Products items={items} />
      </>
    );
  }
}

export default App;

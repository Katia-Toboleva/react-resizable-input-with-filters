import React from 'react';
import RangeInput from './components/range-input';
import { Products, fetchProducts } from './components/products';
import { Row, Column } from './components/grid';
import styles from './reset.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceRange: undefined,
      products: [],
      fetchProductsRequestStatus: '',
    };

    this.handleFetchProductsSuccess = this.handleFetchProductsSuccess.bind(this);
    this.handleFetchProductsRejected = this.handleFetchProductsRejected.bind(this);

    this.handleRangeInputChange = this.handleRangeInputChange.bind(this);
    this.handleMinInputValueChange = this.handleMinInputValueChange.bind(this);
    this.handleMaxInputValueChange = this.handleMaxInputValueChange.bind(this);
    this.getMinPrice = this.getMinPrice.bind(this);
    this.getMaxPrice = this.getMaxPrice.bind(this);
  }

  // Lifecycle events
  // ======================
  componentDidMount() {
    this.fetchProducts();
  }

  handleFetchProductsSuccess(products) {
    this.setState({
      products,
      fetchProductsRequestStatus: 'success',
    })
  }

  // setFirstState() {
  //   this.setState({
  //     priceRange: {
  //       min: this.getMinPrice(),
  //       max: this.getMaxPrice(),
  //     },
  //   });
  // }

  handleFetchProductsRejected() {
    this.setState({
      fetchProductsRequestStatus: 'rejected',
    });
  }

  fetchProducts() {
    this.setState({
      fetchProductsRequestStatus: 'pending',
    });

    fetchProducts()
      .then(this.handleFetchProductsSuccess)
      // .then(this.setFirstState)
      .catch(this.handleFetchProductsRejected);
  }

  // Events===================================

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

    if (!priceRange || !priceRange.min || !priceRange.max) {
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

  calculateFullRangeValue(maxPrice, minPrice) {
    return maxPrice - minPrice;
  }

  convertPercentIntoNumber(percent, totalNumber) {
    return (percent * totalNumber) / 100;
  }

  handleRangeInputChange(values) {
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
    const { priceRange } = this.state;
    const { value } = event.currentTarget;

    if (Number(value) < minPrice) {
      return;
    }

    if (priceRange.max !== '' && Number(value) > Number(priceRange.max)) {
      return;
    }

    this.setState({
      priceRange: {
        min: Number(value),
        max: priceRange.max,
      },
    });
  }

  handleMaxInputValueChange(event) {
    const maxPrice = this.getMaxPrice();
    const { priceRange } = this.state;
    const { value } = event.currentTarget;

    if (Number(value) > maxPrice) {
      return;
    }

    if (priceRange.min !== '' && Number(value) < Number(priceRange.min)) {
      return;
    }

    this.setState({
      priceRange: {
        min: priceRange.min,
        max: Number(value),
      },
    });
  }

  render() {
    // console.log('state of App', this.state);
    const { fetchProductsRequestStatus } = this.state;
    const { priceRange } = this.state;
    // const minPrice = this.getMinPrice();
    // const maxPrice = this.getMaxPrice();
    const items = this.getItems();

    if (!priceRange) {
      return null;
    }

    return (
      <>
        {fetchProductsRequestStatus === 'pending' && <div>Hold on, we are fetching the data</div>}

        {fetchProductsRequestStatus === 'rejected' && <div>We have not received data from the server, please try again later</div>}

        {fetchProductsRequestStatus === 'success' && products.length !== 0 && (
        <>
        <Row position="center">
          <RangeInput
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
            values={[priceRange.min, priceRange.max]}
            spaces={10}
            sticky
            onChange={this.handleRangeInputChange}
          />
        </Row>

        <Row direction="row" position="center">
          <Column>
            <input
              type="text"
              placeholder={priceRange.min}
              className={styles['values-field']}
              onChange={this.handleMinInputValueChange}
            />
          </Column>
          <Column>
            <input
              type="text"
              placeholder={priceRange.max}
              className={styles['values-field']}
              onChange={this.handleMaxInputValueChange}
            />
          </Column>
        </Row>

        <Products items={items} />
        < />
        )}
      </>
    );
  }
}

export default App;

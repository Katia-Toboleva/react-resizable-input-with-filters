import React from 'react';
import RangeInput from './components/range-input';
import { Products, fetchProducts } from './components/products';
import { Row, Column } from './components/grid';
import styles from './reset.scss';

const getMinPrice = (products) => {
  const minPrice = Math.min(...products.map((item) => item.price));

  return minPrice;
};

const getMaxPrice = (products) => {
  const maxPrice = Math.max(...products.map((item) => item.price));

  return maxPrice;
};

const convertPercentIntoNumber = (percent, totalNumber) => (percent * totalNumber) / 100;

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
      priceRange: {
        min: getMinPrice(products),
        max: getMaxPrice(products),
      },
    });
  }

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
      .catch(this.handleFetchProductsRejected);
  }

  // Events===================================

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

  handleRangeInputChange(values) {
    const { products } = this.state;
    const minPrice = getMinPrice(products);
    const maxPrice = getMaxPrice(products);
    const fullRangeValue = maxPrice - minPrice;
    const stepLeftValue = convertPercentIntoNumber(values.left, fullRangeValue);
    const stepRightValue = convertPercentIntoNumber(values.right, fullRangeValue);

    this.setState({
      priceRange: {
        min: minPrice + stepLeftValue,
        max: maxPrice - stepRightValue,
      },
    });
  }

  handleMinInputValueChange(event) {
    const { products, priceRange } = this.state;
    const { value } = event.currentTarget;
    const minPrice = getMinPrice(products);

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
    const { products, priceRange } = this.state;
    const { value } = event.currentTarget;
    const maxPrice = getMaxPrice(products);

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
    console.log('state of App', this.state);

    const { priceRange, products, fetchProductsRequestStatus } = this.state;
    const minPrice = getMinPrice(products);
    const maxPrice = getMaxPrice(products);
    const items = this.getItems();

    return (
      <div>
        {fetchProductsRequestStatus === 'pending' && <div className={styles.status}>Getting the best deals for you...</div>}

        {fetchProductsRequestStatus === 'rejected' && <div className={styles.status}>We cannot reach the server, please try again</div>}

        {fetchProductsRequestStatus === 'success' && products.length !== 0 && (
          <>
            <Row position="center">
              <RangeInput
                minPrice={minPrice}
                maxPrice={maxPrice}
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
          </>
        )}
      </div>
    );
  }
}

export default App;

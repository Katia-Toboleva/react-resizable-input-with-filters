import React from 'react';
import RangeInput from './components/range-input';
import styles from './reset.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      priceRange: {
        min: '',
        max: '',
      },
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

  render() {
    const { priceRange } = this.state;

    return (
      <>
        <RangeInput onChange={this.handleChange} spaces={10} sticky />
        <br />
        <br />

        <input type="text" value={priceRange.min} className={styles['values-field']} />
        <input type="text" value={priceRange.max} className={styles['values-field']} />

        {/* <Products /> */}
      </>
    );
  }
}

export default App;

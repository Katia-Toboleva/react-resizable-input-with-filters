import React, { useState } from 'react';
import RangeInput from './components/range-input';

const App = () => {
  const [values, setValues] = useState({});

  const handleChange = (values) => {
    setValues(values);
  };

  return (
    <>
      <RangeInput onChange={handleChange} spaces={10} sticky />
      <br />
      <br />

      {/* <input type='text' value={values.left} />
      <input type='text' value={100 - values.right} /> */}

      {/* <Products /> */}
    </>
  );
};

export default App;

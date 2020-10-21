import React, { useState } from 'react';

import RangeInput from './components/range-input';
import Scale from './components/scale';

const App = () => {
  const [values, setValues] = useState({});

  const handleChange = (values) => {

    setValues(values);
  };


  console.log(values);

  return (
    <>
      <RangeInput onChange={handleChange} />
      <Scale />

      {Object.entries(values).map(([key, value]) => {
        return (
          <div>{key}: {value}</div>
        )
      })}
    </>
  )
};

export default App;

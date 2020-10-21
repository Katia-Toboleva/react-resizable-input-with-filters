import React, { useState } from 'react';

import RangeInput from './components/range-input';
import Scale from './components/scale';

const App = () => {
  const [values, setValues] = useState({});

  const handleChange = (values) => {
    setValues(values);
  };

  return (
    <>
      <RangeInput onChange={handleChange} />
      <Scale />

      {Object.entries(values).map(([key, value]) => (
        <div key={key}>
          {key}
          :
          {' '}
          {value}
        </div>
      ))}
    </>
  );
};

export default App;

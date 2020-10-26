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

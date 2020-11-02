// import React from 'react';
// import { shallow } from 'enzyme';
// import RangeInput from './range-input';
import * as RangeUtilities from './range-utilities';

describe('RangeUtilities', () => {
  describe('getCoordinates', () => {
    describe('when called', () => {
      it('should return correct obj with valid props passed', () => {
        const props = {
          minPrice: 50,
          maxPrice: 250,
          values: [90, 230],
        };

        const received = RangeUtilities.getCoordinates(props);
        const expected = {
          left: 20,
          right: 10,
          width: 70,
        };

        expect(received).toMatchObject(expected);
      });

      it('should return an empty obj with invalid values in props passed', () => {
        const props = {
          minPrice: 50,
          maxPrice: 250,
          values: undefined,
        };

        const received = RangeUtilities.getCoordinates(props);
        const expected = {};

        expect(received).toMatchObject(expected);
      });
    });
  });
});

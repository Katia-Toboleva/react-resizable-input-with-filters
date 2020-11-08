import React from 'react';
import { shallow } from 'enzyme';
import RangeInput from './range-input';
import * as RangeUtilities from './range-utilities';

describe('RangeInput', () => {
  describe('getDerivedStateFromProps', () => {
    describe('when called', () => {
      it('should return a correct object', () => {
        const state = {
          isMouseActive: false,
          left: 0,
          right: 0,
        };

        const props = {
          values: [70, 230],
          sticky: true,
          spaces: 10,
        };

        const expected = RangeInput.getDerivedStateFromProps(props, state);
        const received = {
          left: 10,
          right: 10,
          width: 80,
        };

        expect(received).toMatchObject(expected);
      });
    });
  });
});

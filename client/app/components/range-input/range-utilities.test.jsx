import * as RangeUtilities from './range-utilities';

describe('RangeUtilities', () => {
  describe('getCoordinates', () => {
    describe('when called with valid props passed', () => {
      it('should return correct obj', () => {
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

  describe('getMagnetValue', () => {
    describe('when called', () => {
      it('should return a correctly rounded value', () => {
        const percentage = 48;
        const spaces = 10;

        const received = RangeUtilities.getMagnetValue(percentage, spaces);
        const expected = 50;

        expect(received).toEqual(expected);
      });

      it('should return a correctly rounded value', () => {
        const percentage = 41;
        const spaces = 10;

        const received = RangeUtilities.getMagnetValue(percentage, spaces);
        const expected = 40;

        expect(received).toEqual(expected);
      });
    });
  });

  describe('calculatePercentage', () => {
    describe('when called', () => {
      it('should return correct value', () => {
        const value = 200;
        const width = 1000;

        const expected = RangeUtilities.calculatePercentage(value, width);
        const received = 20;

        expect(received).toEqual(expected);
      });
    });
  });
});

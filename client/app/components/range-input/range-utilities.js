export const getCoordinates = (props) => {
  const { minPrice, maxPrice, values } = props;

  if (!values) {
    return {};
  }

  const [left, right] = values;

  const fullRangeValue = maxPrice - minPrice;
  const leftPercent = ((left - minPrice) * 100) / fullRangeValue;
  const rightPercent = ((maxPrice - right) * 100) / fullRangeValue;
  const widthPercent = 100 - (leftPercent + rightPercent);

  return {
    left: leftPercent,
    right: rightPercent,
    width: widthPercent,
  };
};

export const getMagnetValue = (percentage, spaces) => {
  const step = 100 / spaces;
  const magnetValue = (Math.round(percentage / step)) * step;

  return magnetValue;
};

export const calculatePercentage = (value, width) => (value * 100) / (width);

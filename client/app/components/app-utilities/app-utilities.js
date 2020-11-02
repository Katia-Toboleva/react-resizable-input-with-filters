export const getMinPrice = (products) => {
  const minPrice = Math.min(...products.map((item) => item.price));

  return minPrice;
};

export const getMaxPrice = (products) => {
  const maxPrice = Math.max(...products.map((item) => item.price));

  return maxPrice;
};

export const convertPercentIntoNumber = (percent, totalNumber) => (percent * totalNumber) / 100;

export const filteredProducts = (priceRange, products) => (
  products.filter(product => (product.price >= priceRange.min && product.price <= priceRange.max))
);

export const getItems = (priceRange, products) => {
  if (!priceRange || !priceRange.min || !priceRange.max) {
    return products;
  }

  return filteredProducts(priceRange, products);
};

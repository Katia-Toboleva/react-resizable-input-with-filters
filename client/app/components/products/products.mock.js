const products = [
  {
    name: 'Mornington Hotel London Victoria',
    price: 50,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/20000/14300/14264/7d872231_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '35 Charles St, Mayfair, London W1J 5EB',
  },
  {
    name: 'Merit Kensington Hotel',
    price: 60,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/30000/28600/28508/00b600ec_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: "12 & 24 Penywern Rd, Earl's Court, London SW5 9ST",

  },
  {
    name: 'Holiday Inn London',
    price: 75,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/30000/20200/20124/bc169fd5_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '103-109 Southwark St, London SE1 0JQ',
  },
  {
    name: 'DoubleTree by Hilton London',
    price: 83,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '30 John Islip St, Westminster, London SW1P 4DD',
  },
  {
    name: 'Marlin Aldgate Tower Bridge',
    price: 93,
    url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '58 Commercial Rd, Whitechapel, London E1 1LP',
  },
  {
    name: 'The Chesterfield Mayfair',
    price: 123,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '35 Charles St, Mayfair, London W1J 5EB',
  },
  {
    name: 'The Zetter Townhouse Marylebone',
    price: 172,
    url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: ' 28-30 Seymour St, Marylebone, London W1H 7JB',
  },
  {
    name: 'The Bloomsbury',
    price: 185,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/2300/2276/ca632b05_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '28-30 Seymour St, Marylebone, London W1H 7JB',
  },
  {
    name: 'Firmdale Hotel',
    price: 195,
    url: 'https://exp.cdn-hotels.com/hotels/29000000/28760000/28758100/28758089/789e750f_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '15-17 Charlotte St, Fitzrovia, London W1T 1RJ',
  },
  {
    name: 'Grand Residences by Marriott',
    price: 250,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/100/1/32995e71_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '47 Park St, Mayfair, London W1K 7EB',
  },
];

const fetchProducts = () => {
  const delay = Math.floor(Math.random() * 3000) + 1;
  const failureRandomNumber = Math.floor(Math.random() * 10) + 1;

  return new Promise((resolve, reject) => {
    if (failureRandomNumber < 2) {
      reject();

      return;
    }

    window.setTimeout(() => {
      resolve(products);
    }, delay);
  });
};

export default fetchProducts;
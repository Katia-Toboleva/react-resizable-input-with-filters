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
    url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/8200/8161/96345523_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '58 Commercial Rd, Whitechapel, London E1 1LP',
  },
  {
    name: 'The Chesterfield Mayfair',
    price: 123,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/2300/2276/48468c99_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '35 Charles St, Mayfair, London W1J 5EB',
  },
  {
    name: 'The Cavendish London',
    price: 136,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/20000/13900/13891/fe5cb50b_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '81 Jermyn Street, St Jamess, London, England, SW1Y 6JF',
  },
  {
    name: 'The Soho Hotel',
    price: 160,
    url: 'https://exp.cdn-hotels.com/hotels/2000000/1120000/1112700/1112611/e46915c7_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '35 Charles Street, London, England, W1J 5EB',
  },
  {
    name: 'The Zetter Townhouse Marylebone',
    price: 172,
    url: 'https://exp.cdn-hotels.com/hotels/2000000/1050000/1050000/1049989/498683f1_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: ' 28-30 Seymour St, Marylebone, London W1H 7JB',
  },
  {
    name: 'The Bloomsbury',
    price: 185,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/10000/2300/2276/ca632b05_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '86-88 Clerkenwell Road, London, England, EC1M 5RJ',
  },
  {
    name: 'Firmdale Hotel',
    price: 195,
    url: 'https://exp.cdn-hotels.com/hotels/2000000/1120000/1112700/1112611/2cb94b21_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '15-17 Charlotte St, Fitzrovia, London W1T 1RJ',
  },
  {
    name: 'The Sumner',
    price: 220,
    url: 'https://exp.cdn-hotels.com/hotels/3000000/2550000/2542800/2542721/e8e46e75_b.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '54 Upper Berkeley Street, Marble Arch, London, England, W1H 7QR',
  },
  {
    name: 'Grand Residences by Marriott',
    price: 250,
    url: 'https://exp.cdn-hotels.com/hotels/1000000/30000/23100/23016/edd44a92_z.jpg?impolicy=fcrop&w=773&h=530&q=high',
    address: '47 Park St, Mayfair, London W1K 7EB',
  },
];

const fetchProducts = () => {
  const delay = Math.floor(Math.random() * 2000) + 1;
  const failureRandomNumber = Math.floor(Math.random() * 20) + 1;

  return new Promise((resolve, reject) => {
    if (failureRandomNumber < 1) {
      reject();

      return;
    }

    window.setTimeout(() => {
      resolve(products);
    }, delay);
  });
};

export default fetchProducts;

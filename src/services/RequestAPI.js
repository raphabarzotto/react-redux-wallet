export const REQUEST_API = 'https://economia.awesomeapi.com.br/json/all';

const requestCurrencies = async () => {
  const response = await fetch(REQUEST_API);
  const currencies = await response.json();
  delete currencies.USDT;
  return currencies;
};

export default requestCurrencies;

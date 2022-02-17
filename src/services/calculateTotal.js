const calculateTotal = (expensesArray) => {
  const arrayConvertionToBRL = expensesArray.map(
    (element) => (element.value * element.exchangeRates[element.currency].ask),
  );
  const sum = arrayConvertionToBRL.reduce(
    (partialSum, element) => partialSum + element, 0,
  );
  return sum.toFixed(2);
};

export default calculateTotal;

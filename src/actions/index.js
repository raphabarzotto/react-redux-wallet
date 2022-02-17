import RequestAPI from '../services/RequestAPI';

// Actions Type
export const LOGIN_ACTION = 'LOGIN';
export const CURRENCIES_ACTION = 'CURRENCIES';
export const SAVE_EXPENSES = 'EXPENSES';
export const SAVE_TOTAL = 'TOTAL';
// fetch quando carregar o header
// add expense
// delete expense
// edit expense

export function loginButtonPress(payload) {
  return {
    type: LOGIN_ACTION,
    payload,
  };
}

export const currenciesAction = () => async (dispatch) => {
  const currencies = await RequestAPI();
  dispatch({
    type: CURRENCIES_ACTION,
    currencies,
  });
};

export function saveExpenses(payload) {
  return {
    type: SAVE_EXPENSES,
    payload,
  };
}

export function saveTotal(payload) {
  return {
    type: SAVE_TOTAL,
    payload,
  };
}

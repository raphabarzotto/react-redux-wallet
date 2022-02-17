import {
  CURRENCIES_ACTION,
  SAVE_EXPENSES,
  SAVE_TOTAL }
from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalBRL: 0,
  isLoading: true,
  tableLength: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.currencies,
      isLoading: false,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      tableLength: state.tableLength + 1,
      expenses: action.payload,
    };
  case SAVE_TOTAL:
    return {
      ...state,
      totalBRL: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { currenciesAction, saveExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      value: '',
      currency: '',
      method: '',
      description: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { currenciesActionProp } = this.props;
    currenciesActionProp();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const {
      saveExpensesProp,
      tableLength,
      userWalletExpenses,
    } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const newExpense = [
      ...userWalletExpenses,
      {
        id: tableLength,
        value,
        currency,
        method,
        description,
        tag,
      },
    ];

    saveExpensesProp(newExpense);
    this.setState({
      value: '',
      // currency: '',
      // method: '',
      // description: '',
      // tag: '',
    });
  }

  render() {
    const { currencies, isLoading } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    if (isLoading) {
      return (<p>Loading...</p>);
    }
    return (
      <div className="wallet-form-wrap">
        <form className="wallet-form">

          <label htmlFor="value-input">
            Value:
            <input
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              className="wallet-form-input"
              id="value-input"
              placeholder="Value"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description-input">
            Description:
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              className="wallet-form-input"
              id="description-input"
              placeholder="Description"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency-input">
            Currency:
            <select
              name="currency"
              value={ currency }
              data-testid="currency-input"
              className="wallet-form-input"
              id="currency-input"
              onChange={ this.handleChange }
            >
              <option value="" disabled>Currency</option>
              {Object.values(currencies).map((coin) => (
                <option
                  key={ coin.code }
                  value={ coin.code }
                  data-testid={ coin.code }
                >
                  { coin.code }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method-input">
            Payment Method:
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              className="wallet-form-input"
              id="method-input"
              onChange={ this.handleChange }
            >
              <option value="" disabled>Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Category
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              className="wallet-form-input"
              id="tag-input"
              onChange={ this.handleChange }
            >
              <option value="" disabled>Category</option>
              <option value="Food">Food</option>
              <option value="Recreation & Entertainment">Recreation & Entertainment</option>
              <option value="Work">Work</option>
              <option value="Transportation">Transportation</option>
              <option value="Health">Health</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
            className="wallet-form-button"
          >
            Add Expense
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.object,
  isLoading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isLoading: state.wallet.isLoading,
  tableLength: state.wallet.tableLength,
  userWalletExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesActionProp: () => dispatch(currenciesAction()),
  saveExpensesProp: (currenciesToSend) => dispatch(saveExpenses(currenciesToSend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

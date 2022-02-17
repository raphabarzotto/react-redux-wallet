import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { currenciesAction, saveExpenses, saveTotal, loginButtonPress } from '../actions';
import calculateTotal from '../services/calculateTotal';

class Form extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.totalUpdate = this.totalUpdate.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      expenseToSave: [],
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
    const { saveExpensesProp, tableLength, currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      expenseToSave,
    } = this.state;
    expenseToSave.push({
      id: tableLength + 1,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    });
    saveExpensesProp(expenseToSave);
    this.totalUpdate();
  }

  totalUpdate = () => {
    const { saveTotalProp, loginButtonPressProp } = this.props;
    const { expenseToSave } = this.state;
    const sum = calculateTotal(expenseToSave);
    saveTotalProp(sum);
    loginButtonPressProp(sum);
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
      <form>

        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            id="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            type="textarea"
            name="description"
            value={ description }
            data-testid="description-input"
            id="description-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            id="currency-input"
            onChange={ this.handleChange }
          >
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
          Forma de Pagamento:
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            id="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
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
});

const mapDispatchToProps = (dispatch) => ({
  currenciesActionProp: () => dispatch(currenciesAction()),
  saveExpensesProp: (currenciesToSend) => dispatch(saveExpenses(currenciesToSend)),
  saveTotalProp: (totalToSave) => dispatch(saveTotal(totalToSave)),

  loginButtonPressProp: (email) => dispatch(loginButtonPress(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

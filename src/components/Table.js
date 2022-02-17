import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const {
              value,
              currency,
              method,
              tag,
              description,
              id,
              exchangeRates,
            } = expense;
            const expenseCurrencyValue = exchangeRates[currency];
            const totalValue = value * expenseCurrencyValue.ask;
            const currencyValue = Number(expenseCurrencyValue.ask).toFixed(2);
            const valueToFixed = Number(value).toFixed(2);
            const totalValueToFixed = Number(totalValue).toFixed(2);

            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ valueToFixed }</td>
                <td>{ expenseCurrencyValue.name }</td>
                <td>{ currencyValue }</td>
                <td>{ totalValueToFixed }</td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

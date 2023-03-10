import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Tag</th>
              <th>Payment Method</th>
              <th>Value</th>
              <th>Currency</th>
              <th>Exchange</th>
              <th>Converted Value</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense, index) => {
              const {
                value,
                currency,
                method,
                tag,
                description,
                id,
                exchangeRates,
              } = expense;
              
              const classToUse = (index + 1) % 2 === 0 ? "light-grey-line" : "white-line";
              const expenseCurrencyValue = exchangeRates[currency];
              const totalValue = value * expenseCurrencyValue.ask;
              const currencyValue = Number(expenseCurrencyValue.ask).toFixed(2);
              const valueToFixed = Number(value).toFixed(2);
              const totalValueToFixed = Number(totalValue).toFixed(2);
              
              return (
                <tr key={ id } className={ classToUse }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ valueToFixed }</td>
                  <td>{ expenseCurrencyValue.name }</td>
                  <td>{ currencyValue }</td>
                  <td>{ totalValueToFixed }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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

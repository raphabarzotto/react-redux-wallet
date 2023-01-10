import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import calculateTotal from '../services/calculateTotal';

class Header extends React.Component {
  render() {
    const { userEmail,
      // userTotalProp,
      userWalletExpenses,
    } = this.props;
    // console.log(calculateTotal(userWalletExpenses));
    const sum = calculateTotal(userWalletExpenses);
    return (
      <header>
        <h3 className="wallet-email-header">
          <span>Email: </span>

          <span data-testid="email-field">
            { userEmail }
          </span>
        </h3>
        <h3 className="wallet-total-header">
          <span>Despesa Total: R$ </span>

          <span data-testid="total-field">
            { sum }
            {/* { userTotalProp } */}
          </span>
          <span> </span>

          <span data-testid="header-currency-field">
            BRL
          </span>
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userTotalProp: state.wallet.totalBRL,
  userWalletExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

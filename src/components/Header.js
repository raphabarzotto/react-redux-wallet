import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import calculateTotal from '../services/calculateTotal';

class Header extends React.Component {
  render() {
    const { userEmail, userWalletExpenses } = this.props;
    console.log(calculateTotal(userWalletExpenses));
    const teste = calculateTotal(userWalletExpenses);
    return (
      <header>
        <p>
          <span>Email: </span>

          <span data-testid="email-field">
            { userEmail }
          </span>
        </p>
        <p>
          <span>Despesa Total: R$ </span>

          <span data-testid="total-field">
            { teste }
          </span>
          <span> </span>

          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userWalletExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
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
            0
            {' '}
          </span>

          <span data-testid="header-currency-field">
            BRL
          </span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state.wallet.expenses);
  return {
    userEmail: state.user.email,
    userWalletExpenses: state.wallet.expenses,
  };
};

export default connect(mapStateToProps)(Header);

import React from 'react';
import { connect } from 'react-redux';

import { loginButtonPress } from '../actions';

class Login extends React.Component {
  render() {
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
        />
        <button
          type="button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch');
  return {
    loginButtonPressProp: () => dispatch(loginButtonPress),
  };
};

export default connect(null, mapDispatchToProps)(Login);

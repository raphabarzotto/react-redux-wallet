import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './login.css'

import { loginButtonPress } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      password: '',
      isPasswordValid: false,
      isEmailValid: false,
      redirect: false,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;

    this.validateButton(name, value);
    this.setState({
      [name]: value,
    });
  }

  validateButton(name, value) {
    const nameEmail = 'email';
    const minPasswordLength = 6;

    // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const REGEX = /\S+@\S+\.\S+/;

    if (name === nameEmail) {
      const testeEmail = REGEX.test(value);
      this.setState({
        isEmailValid: testeEmail,
      });
    } else {
      this.setState({
        isPasswordValid: value.length >= minPasswordLength,
      });
    }
  }

  handleClick() {
    const { loginButtonPressProp } = this.props;
    const { email } = this.state;
    loginButtonPressProp(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, isEmailValid, isPasswordValid, redirect } = this.state;

    if (redirect) return <Redirect to="/carteira" />;
    return (
      <div className="form-login-wrap">
        <form className="form-login">
          <div className="form-header">
            <h3>Login</h3>
          </div>
          <div className="form-login-group">
            <input
              type="email"
              className="form-login-input"
              data-testid="email-input"
              name="email"
              value={ email }
              placeholder="Email"
              onChange={ this.onInputChange }
            />
          </div>
          <div className="form-login-group">
            <input
              type="password"
              className="form-login-input"
              data-testid="password-input"
              name="password"
              value={ password }
              placeholder="Password"
              onChange={ this.onInputChange }
              />
          </div>
          <div className="form-login-group">
            <button
              type="button"
              className="form-login-button"
              disabled={ !isEmailValid || !isPasswordValid }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginButtonPressProp: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginButtonPressProp: (email) => dispatch(loginButtonPress(email)),
});

export default connect(null, mapDispatchToProps)(Login);

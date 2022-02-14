import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    console.log(userEmail);

    return <div>Header</div>;
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userEmail: state.user.email,
  };
};

export default connect(mapStateToProps)(Header);

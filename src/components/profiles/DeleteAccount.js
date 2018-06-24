import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteAccount } from '../../store/actions/profileActions';

class DeleteAccount extends Component {
  componentDidMount = () => {
    this.props.deleteAccount();
  };

  render() {
    return <Redirect to="/" />;
  }
}

DeleteAccount.propTypes = {
  deleteAccount: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteAccount }
)(DeleteAccount);

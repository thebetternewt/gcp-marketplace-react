import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../common/Spinner';
import Profile from './Profile';
import { getUserData } from '../../store/actions/authActions';

import userPlaceholder from '../../images/user.png';

class Dashboard extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    console.log('Mounted');
    const idToken = localStorage.getItem('token');
    this.props.getUserData(idToken);
    this.setState({ loading: false });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <Profile profileImage={this.props.photoUrl} name={this.props.name} />
    );
  }
}

Dashboard.propTypes = {
  name: PropTypes.string,
  photoUrl: PropTypes.string,
  getUserData: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  name: null,
  photoUrl: userPlaceholder,
};

const mapStateToProps = state => ({
  name: state.auth.name,
  photoUrl: state.auth.photoUrl,
});

export default connect(mapStateToProps, { getUserData })(Dashboard);

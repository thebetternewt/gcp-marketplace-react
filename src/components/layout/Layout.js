import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import SideDrawer from './SideDrawer';
import Footer from './Footer';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.shape().isRequired,
  };

  state = {
    sideDrawerOpen: false,
  };

  toggleSideDrawer = () => {
    this.setState(prevState => ({ sideDrawerOpen: !prevState.sideDrawerOpen }));
  };

  render() {
    return (
      <div>
        <Header toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer
          toggle={this.toggleSideDrawer}
          open={this.state.sideDrawerOpen}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;

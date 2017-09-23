import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class Menu extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        open:false
      }
    }

    handleToggle = () => this.setState({
      open: !this.state.open
    });

    render() {
      return (
        <div>
              <AppBar title="Muzix" iconClassNameRight="muidocs-icon-navigation-expand-more" onTouchTap={this.handleToggle}/>
              <Drawer open={this.state.open}>
                <MenuItem containerElement={<Link to="/" />}
                primaryText="Home"></MenuItem>
                <MenuItem containerElement={<Link to="/login" />}
                primaryText="Login"></MenuItem>
                <MenuItem containerElement={<Link to="/logout" />}
                primaryText="Logout"></MenuItem>
              </Drawer>
        </div>
      );
    }

}

export default Menu;

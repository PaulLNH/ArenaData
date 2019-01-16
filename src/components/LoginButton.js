import React, { Component } from 'react';
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

class LoginButton extends Component {
    state = {
      authenticated: false,
      user: "Paul",
      menuAnchorEl: null,
    };
  
    componentDidUpdate() {
      this.checkAuthentication();
    }
  
    componentDidMount() {
      this.checkAuthentication();
    }
  
    async checkAuthentication() {
      const authenticated = this.props.auth;
      if (authenticated !== this.state.authenticated) {
        const user = "Paul";
        this.setState({ authenticated, user });
      }
    }
  
    login = () => this.props.auth.login();
    logout = () => {
      this.handleMenuClose();
      this.props.auth = false;
    };
  
    handleMenuOpen = event => this.setState({ menuAnchorEl: event.currentTarget });
    handleMenuClose = () => this.setState({ menuAnchorEl: null });
  
    render() {
      const { authenticated, user, menuAnchorEl } = this.state;
  
      if (authenticated == null) return null;
      if (!authenticated) return <Button color="inherit" onClick={this.login}>Login</Button>;
  
      const menuPosition = {
        vertical: 'top',
        horizontal: 'right',
      };
  
      return (
        <div>
          <IconButton onClick={this.handleMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            anchorOrigin={menuPosition}
            transformOrigin={menuPosition}
            open={!!menuAnchorEl}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.logout}>
              <ListItemText
                primary="Logout"
                secondary={user && user.name}
              />
            </MenuItem>
          </Menu>
        </div>
      );
    }
  }
  
  export default LoginButton;
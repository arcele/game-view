import React, { Component } from 'react'


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


class Nav extends Component {
	render() {
    return(
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Game View
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

}

export default Nav

import React, { Component } from 'react'


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'

class Nav extends Component {

	render() {
		let currentView = this && this.props && this.props.currentView;
		return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{width:"70%"}}>
            Game View
          </Typography>
					{ currentView !== 'schedule' &&
						<Link to='/' style={{textDecoration:'none'}}>
							<Button variant="contained">Back to Schedule</Button>
						</Link>
					}
        </Toolbar>
      </AppBar>
    )
  }

}

export default Nav

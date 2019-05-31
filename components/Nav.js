import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'

class Nav extends Component {

	render() {
		let currentView = this && this.props && this.props.currentView,
				viewDate = moment(this.props.schedule && this.props.schedule.scheduleDate);

		return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{width:"70%"}}>
            Game View {
							` for ${viewDate.format('ddd, MMM D')}`
						}
          </Typography>
					{ currentView !== 'schedule' &&
						<Link to={"/schedule/"+viewDate.format('YYYY-MM-DD')} style={{textDecoration:'none'}}>
							<Button variant="contained">Back to Schedule</Button>
						</Link>
					}
        </Toolbar>
      </AppBar>
    )
  }

}
const mapStateToProps = (state) => {
	return {
		schedule: state.gameView.schedule,
	}
}

export default connect(mapStateToProps)(Nav)

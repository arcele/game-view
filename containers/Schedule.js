import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchSchedule } from '../actions/main'
import Nav from '../components/Nav'
import PropTypes from 'prop-types'
import Odds from '../components/Odds'
import moment from 'moment'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

class Schedule extends Component {
	componentDidMount() {
		let scheduleDate = this.props.schedule && this.props.schedule.scheduleDate;
		if(!scheduleDate || scheduleDate && !this.props.schedule[scheduleDate]) {
			this.props.dispatch(fetchSchedule())
		}
	}

	render() {
		let scheduleDate = this.props.schedule && this.props.schedule.scheduleDate,
				games = scheduleDate ? this.props.schedule[this.props.schedule.scheduleDate] : []

		return (
			<Paper style={{maxWidth:'700px', margin: 'auto'}}>
				<Nav currentView="schedule" />
				{ games.length === 0 &&
					`Loading, or whatever.`
				}
				<Grid container spacing={3}>
					<Grid item xs={12}>
							<Link to={'/?date=' +  moment(scheduleDate).add(-1,'day').format('YYYY-MM-DD') } style={{textDecoration: 'none', marginRight: 15}}>
							  &laquo;
							</Link>
							{ scheduleDate && moment(scheduleDate).format('ddd, MMM D')}
							<Link to={'/?date=' +  moment(scheduleDate).add(1,'day').format('YYYY-MM-DD') } style={{textDecoration: 'none', marginLeft: 15}}>
								&raquo;
							</Link>
					</Grid>
					<Grid item xs={5}>Away</Grid>
					<Grid item xs={5}>Home</Grid>
					<Grid item xs={2}>First Pitch</Grid>
					{ games.map((game) => {
						let gameDate = new Date(game['gameDate'])
						return(
							<Grid item xs={12}>
								<Card>
									<Grid container spacing={2}>
										<Grid item xs={5}>
											{game.awayTeam && game.awayTeam.full}
											<Odds odds={game.awayTeam && game.awayTeam.odds} format='us' />
											<br />
											{game.awayTeam && game.awayTeam.record && ( game.awayTeam.record.wins + ' - ' + game.awayTeam.record.losses)}
										</Grid>
										<Grid item xs={5}>
											{game.homeTeam && game.homeTeam.full}
											<Odds odds={game.homeTeam && game.homeTeam.odds} format='us' />
											<br />
											{game.homeTeam && game.homeTeam.record && ( game.homeTeam.record.wins + ' - ' + game.homeTeam.record.losses)}

										</Grid>
										<Grid item xs={2}>
											{moment(gameDate).format('h:mm a')}
										</Grid>
									</Grid>
								</Card>
							</Grid>
						)
					})}



				</Grid>
			</Paper>
		)
	}
	loadGame(e, props) {
		let gameId = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.gameId
		if(gameId) {
				this.props.history.push(`game/${gameId}`)
		}
	}
}

Schedule.propTypes = {
	dispatch: PropTypes.func.isRequired,
	schedule: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
	return {
		schedule: state.gameView.schedule,
	}
}

export default connect(mapStateToProps)(Schedule)

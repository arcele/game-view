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
				<Table>
					<TableHead>
					  <TableRow>
							<TableCell colSpan="3" align="center">
							<Link to={'/?date=' +  moment(scheduleDate).add(-1,'day').format('YYYYMMDD') } style={{textDecoration: 'none', marginRight: 15}}>
							  &laquo;
							</Link>
							{ scheduleDate && moment(scheduleDate).format('ddd, MMM D')}
							<Link to={'/?date=' +  moment(scheduleDate).add(1,'day').format('YYYYMMDD') } style={{textDecoration: 'none', marginLeft: 15}}>
								&raquo;
							</Link>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Away</TableCell>
							<TableCell>Home</TableCell>
							<TableCell>First Pitch</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{ games.map((game) => {
							let gameDate = new Date(game['game_time_et'])
							return (
								<TableRow
									key={game['game_pk']}
									data-game-id={game['game_pk']}
									onClick={this.loadGame.bind(this)}
									style={{cursor:'pointer'}}
									hover>

									<TableCell>
										{game.awayTeam && game.awayTeam.full}
										<Odds odds={game.awayTeam && game.awayTeam.odds} format='us' />
									</TableCell>
									<TableCell>
										{game.homeTeam && game.homeTeam.full}
										<Odds odds={game.homeTeam && game.homeTeam.odds} format='us' />
									</TableCell>
									<TableCell>
										{moment(gameDate).format('h:mm a')}
									</TableCell>

								</TableRow>
							)
						} )
					}
				  </TableBody>
				</Table>
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

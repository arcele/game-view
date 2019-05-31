import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchSchedule, loadSchedule } from '../actions/main'
import Nav from '../components/Nav'
import PropTypes from 'prop-types'
import Odds from '../components/Odds'
import moment from 'moment'

import { SET_SCHEDULE_DATE } from '../types/main'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Schedule extends Component {
	componentDidMount() {
		this.checkScheduleStatus()
	}

	componentDidUpdate() {
		this.checkScheduleStatus()
	}

	checkScheduleStatus() {
		let scheduleDate = this.props.match && this.props.match.params && this.props.match.params.date || moment().format('YYYY-MM-DD')
		if(!this.props.schedule[scheduleDate]) {
			this.props.dispatch(fetchSchedule(scheduleDate))
		} else if(scheduleDate != this.props.schedule.scheduleDate) {
			// load the already downloaded schedule into the current view
			this.props.dispatch({ type: SET_SCHEDULE_DATE, date: scheduleDate })
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
							<Link to={'/schedule/' +  moment(scheduleDate).add(-1,'day').format('YYYY-MM-DD') } style={{textDecoration: 'none', marginRight: 15}}>
							  &laquo;
							</Link>
							{ scheduleDate && moment(scheduleDate).format('ddd, MMM D')}
							<Link to={'/schedule/' +  moment(scheduleDate).add(1,'day').format('YYYY-MM-DD') } style={{textDecoration: 'none', marginLeft: 15}}>
								&raquo;
							</Link>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Away</TableCell>
							<TableCell>Home</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{ games.map((game) => {
							let gameDate = new Date(game['gameDate'])
							return (
								<TableRow
									key={game['gamePk']}
									data-game-id={game['gamePk']}
									onClick={this.loadGame.bind(this)}
									style={{cursor:'pointer'}}
									hover>

									<TableCell>
										<img style={{height:15, verticalAlign:'middle', marginRight: 5}} src={game && game.awayTeam && "https://www.mlbstatic.com/team-logos/" + game.awayTeam.id + ".svg"} />
										{game && game.status && game.status.statusCode != 'F' && game.status.statusCode != 'I' && game.status.statusCode != 'DR' &&
											<Odds odds={game.awayTeam && game.awayTeam.odds} format='us' />
										}
										{game.awayTeam && game.awayTeam.full}
										<span className="record">
										{ game.awayTeam && game.awayTeam.record && `(${game.awayTeam.record.wins}-${game.awayTeam.record.losses})` }
										</span>
									</TableCell>
									<TableCell>
										<img style={{height:15, verticalAlign:'middle', marginRight: 5}} src={game && game.homeTeam && "https://www.mlbstatic.com/team-logos/" + game.homeTeam.id + ".svg"} />
										{game && game.status && game.status.statusCode != 'F' && game.status.statusCode != 'I' && game.status.statusCode != 'DR' &&
											<Odds odds={game.homeTeam && game.homeTeam.odds} format='us' />
										}
										{game.homeTeam && game.homeTeam.full}
										<span className="record">
										{ game.homeTeam && game.homeTeam.record && `(${game.homeTeam.record.wins}-${game.homeTeam.record.losses})` }
										</span>
									</TableCell>
									<TableCell>
										{game && game.status && (game.status.statusCode == 'P' || game.status.statusCode == 'S') && moment(gameDate).format('h:mm a')}
										{game && game.status && game.status.statusCode == 'F' && (`Final ${game.awayTeam.score}-${game.homeTeam.score}`) }
										{game && game.status && game.status.statusCode == 'I' && (`${game.awayTeam.score}-${game.homeTeam.score}`)}
										{game && game.status && game.status.statusCode == 'DR' && game.status.detailedState}
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
				this.props.history.push(`/game/${this.props.schedule.scheduleDate}/${gameId}`)
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

export default withRouter(connect(mapStateToProps)(Schedule))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame, fetchSchedule } from '../actions/main'
import { LOAD_GAME } from '../types/main'
import Nav from '../components/Nav'
import Odds from '../components/Odds'
import Team from '../components/Team'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class Matchup extends Component {

	componentDidMount() {
		this.fetchData()
	}

	fetchData() {
		// TODO, we're requesting some of these APIs multiple times, we should be cleaner
		// about how we determine if we have and if we have already requested some data
		const { dispatch, match, schedule } = this.props
		const scheduleDate = schedule && schedule.scheduleDate
		// make sure we have the schedule
		if(schedule && scheduleDate && schedule[scheduleDate] && schedule[scheduleDate].length > 0) {
			// We have the proGames on the state, load the game from this schedule
			if(!schedule.game || schedule.game.gamePk != match.params.id) {
				console.log('just fetch the game.')
				this.loadGame(match.params.id);
			}// if we're here we've got all of our data for this view
		} else {
			// we can't do anything without the schedule, so let's get it
			console.log('gotta fetch the schedule')
			const gameDate = match.params.date,
			 			gameYear = moment(match.params.date).format('YYYY')
			dispatch(fetchSchedule(scheduleDate, schedule.oddsResult))
		}
	}

	loadGame(gameId) {
		this.props.dispatch({ type: LOAD_GAME, gameId: gameId })
		this.props.dispatch(fetchGame(gameId))
	}

	componentWillUpdate() {
		this.fetchData();
	}

	render() {
		const game = this.props.schedule.game
		return (
			<Paper style={{maxWidth:'960px', margin: 'auto'}}>
			  <Nav currentView="matchup" />
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
									{ <Team team={game && game.awayTeam} /> }
							</TableCell>
							<TableCell>
									{ <Team team={game && game.homeTeam} /> }
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								<Pitcher team={game && game.awayTeam} pitcher={game && game.awayTeam && game.awayTeam.starter } />
							</TableCell>
							<TableCell>
								<Pitcher team={game && game.homeTeam} pitcher={game && game.homeTeam && game.homeTeam.starter } />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{verticalAlign:'top'}}>
								<Batters team={game && game.awayTeam} players={game && game.homeTeam && game.homeTeam.players } lineup={game && game.homeTeam && game.homeTeam.lineup} />
							</TableCell>
							<TableCell style={{verticalAlign:'top'}}>
								<Batters team={game && game.homeTeam} players={game && game.awayTeam && game.awayTeam.players } lineup={game && game.awayTeam && game.awayTeam.lineup} />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Paper>
		)
	}
}

Matchup.propTypes = {
	dispatch: PropTypes.func.isRequired,
	schedule: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
	return {
		schedule: state.gameView.schedule,
	}
}

export default connect(mapStateToProps)(Matchup)

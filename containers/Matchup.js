import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame, fetchSchedule, makeScheduleCall } from '../actions/main'
import { LOAD_GAME } from '../types/main'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class Matchup extends Component {

	componentDidMount() {
		// make sure we have the schedule
		const { dispatch, match, schedule } = this.props
		new Promise((resolve) => {
			if(schedule && schedule.proGames.length > 0) {
				// We have the proGames on the state, continue on
				resolve()
			} else {
				// fetch the proGames, resolve once we've got 'em'
				const gameDate = new Date().toISOString().split('T')[0].replace(/-/g,'')
				const gameYear = new Date().getFullYear()
				makeScheduleCall(gameDate, gameYear, dispatch).then(() => resolve())
			}
		}).then(() => {
			dispatch({ type: LOAD_GAME, gameId: match.params.id })
			dispatch(fetchGame(this.props.schedule.game))
		})
	}

	render() {
		const game = this.props.schedule.game
		return (
			<Paper style={{maxWidth:'700px', margin: 'auto'}}>
			  <Nav />
				<Link to={`/`}>Schedule</Link>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>{ game && game['away_team_full'] }</TableCell>
							<TableCell>{ game && game['home_team_full'] }</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								<Pitcher team={game && game['away_team_abbrev']} pitcher={game && game.starters && game.starters.away} />
							</TableCell>
							<TableCell>
								<Pitcher team={game && game['home_team_abbrev']} pitcher={game && game.starters && game.starters.home} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<Batters team={game && game['home_team_short']} players={game && game['away_pitcher_bvp']} />
							</TableCell>
							<TableCell>
								<Batters team={game && game['away_team_short']} players={game && game['home_pitcher_bvp']} />
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame, makeScheduleCall, makeBettingOddsCall } from '../actions/main'
import { LOAD_GAME } from '../types/main'
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
				console.log('no need to fetch schedule.')
				resolve()
			} else {
				// fetch the proGames, resolve once we've got 'em'
				const gameDate = new Date().toISOString().split('T')[0].replace(/-/g,'')
				const gameYear = new Date().getFullYear()
				// this is mostly just duping the fetchSchedule() call but i have to dispatch this, so, yeah, whatever
				makeScheduleCall(gameDate, gameYear, dispatch).then(() => {
					makeBettingOddsCall(dispatch).then(() => {
						resolve()
					});
				});
			}
		}).then(() => {
			dispatch({ type: LOAD_GAME, gameId: match.params.id })
			dispatch(fetchGame(this.props.schedule.game))
		})
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
								<img style={{height:75}} src={"https://www.mlbstatic.com/team-logos/" + (game && game.awayTeam && game.awayTeam.id) + ".svg"} />
								{ game && game.awayTeam && game.awayTeam.full } ({ game && game.awayTeam && game.awayTeam.odds && game.awayTeam.odds.us })
							</TableCell>
							<TableCell>
								<img style={{height:75}} src={"https://www.mlbstatic.com/team-logos/" + (game && game.homeTeam && game.homeTeam.id) + ".svg"} />
								{ game && game.homeTeam && game.homeTeam.full } ({ game && game.homeTeam && game.homeTeam.odds && game.homeTeam.odds.us })
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>
								<Pitcher team={game && game.awayTeam && game.awayTeam.abbrev} pitcher={game && game.starters && game.starters.away} />
							</TableCell>
							<TableCell>
								<Pitcher team={game && game.homeTeam && game.homeTeam.abbrev} pitcher={game && game.starters && game.starters.home} />
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell style={{verticalAlign:'top'}}>
								<Batters team={game && game.homeTeam && game.homeTeam.short} players={game && game['away_pitcher_bvp']} />
							</TableCell>
							<TableCell style={{verticalAlign:'top'}}>
								<Batters team={game && game.awayTeam && game.awayTeam.short} players={game && game['home_pitcher_bvp']} />
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

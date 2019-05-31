import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame, makeScheduleCall, makeBettingOddsCall } from '../actions/main'
import { LOAD_GAME } from '../types/main'
import Nav from '../components/Nav'
import Odds from '../components/Odds'

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
		const scheduleDate = schedule && schedule.scheduleDate
		new Promise((resolve) => {
			if(schedule && scheduleDate && schedule[scheduleDate] && schedule[scheduleDate].length > 0) {
				// We have the proGames on the state, continue on
				console.log('no need to fetch schedule.')
				resolve()
			} else {
				// fetch the proGames, resolve once we've got 'em'
				const gameDate = moment().format('YYYY-MM-DD'),
				 			gameYear = moment().format('YYYY')
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
								<img style={{height:75}} src={game && game.awayTeam && "https://www.mlbstatic.com/team-logos/" + game.awayTeam.id + ".svg"} />
								<Odds odds={game && game.awayTeam && game.awayTeam.odds} format='us' />

								{ game && game.awayTeam && game.awayTeam.full }
								<span className="record">
								{ game && game.awayTeam && game.awayTeam.record && `(${game.awayTeam.record.wins}-${game.awayTeam.record.losses})` }
								</span>

							</TableCell>
							<TableCell>
								<img style={{height:75}} src={game && game.homeTeam && "https://www.mlbstatic.com/team-logos/" + game.homeTeam.id + ".svg"} />
								<Odds odds={game && game.homeTeam && game.homeTeam.odds} format='us' />

								{ game && game.homeTeam && game.homeTeam.full }
								<span className="record">
								{ game && game.homeTeam && game.homeTeam.record && `(${game.homeTeam.record.wins}-${game.homeTeam.record.losses})` }
								</span>
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

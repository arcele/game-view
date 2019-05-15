import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchedule } from '../actions/main'
import Nav from '../components/Nav'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Schedule extends Component {
	componentDidMount() {
		if(!this.props.schedule.requestedGames) {
			// We haven't fetched the schedule yet, so, like, do it.
			this.props.dispatch(fetchSchedule())
		}
	}
	render() {
		const games = this.props.schedule.proGames.map((proGame) => {
			// check for dupes
			return proGame
		})
		return (
			<Paper style={{maxWidth:'700px', margin: 'auto'}}>
				<Nav currentView="schedule" />
				{ games.length === 0 &&
					`Loading, or whatever.`
				}
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Away</TableCell>
							<TableCell>Home</TableCell>
							<TableCell>First Pitch</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{ games.map((game) => {
							let gameDate = new Date(game['game_time_local']),
									awayOdds,
									homeOdds,
									awayApplOdds,
									homeApplOdds

							if(game.odds) {
									awayOdds = game.odds.reduce((a,b) => {
										return a.odds ? a.odds.h2h[1] : a +b.odds.h2h[1]
									}, 0) / game.odds.length;
									if(awayOdds >= 2.00) {
										awayApplOdds = '+' + Math.round((awayOdds - 1) * 100)
									} else {
										awayApplOdds = Math.round(-100 / (awayOdds - 1 ))
									}
									homeOdds = game.odds.reduce((a,b) => {
										return a.odds ? a.odds.h2h[0] : a +b.odds.h2h[0]
									}, 0) / game.odds.length;
									if(homeOdds >= 2.00) {
										homeApplOdds = '+' + Math.round((homeOdds - 1) * 100)
									} else {
										homeApplOdds = Math.round(-100 / (homeOdds - 1 ))
									}
							}

							return (
								<TableRow
									key={game['game_pk']}
									data-game-id={game['game_pk']}
									onClick={this.loadGame}
									style={{cursor:'pointer'}}
									hover>

									<TableCell>
										{game['away_team_full']}
										&nbsp;{awayApplOdds && `(${awayApplOdds})`}
									</TableCell>
									<TableCell>
										{game['home_team_full']}
										&nbsp;{homeApplOdds && `(${homeApplOdds})`}
									</TableCell>
									<TableCell>
										{gameDate.toLocaleTimeString()}
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
	loadGame(e) {
		let gameId = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.gameId
		if(gameId) {
			window.location.assign(`/game/${gameId}`);
		}
	}
}
//
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

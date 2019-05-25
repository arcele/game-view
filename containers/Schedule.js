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
		if(	!this.props.schedule.requestedGames &&
				(!this.props.schedule.proGames || this.props.schedule.proGames.length == 0)) {
			this.props.dispatch(fetchSchedule())
		}
	}

	render() {
		const games = this.props.schedule.proGames.map((proGame) => {
			// check for dupes
			return proGame
		})


		// TODO: ADD MOUSOVER TO ODDS TO SHOW BREAKDOWN OF ODDS BY site
		//       Make Team Display/Odds Display seperate component
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
							let gameDate = new Date(game['game_time_et']),
									awayOdds,
									homeOdds,
									awayApplOdds,
									homeApplOdds

							return (
								<TableRow
									key={game['game_pk']}
									data-game-id={game['game_pk']}
									onClick={this.loadGame.bind(this)}
									style={{cursor:'pointer'}}
									hover>

									<TableCell>
										{game.awayTeam && game.awayTeam.full}
										&nbsp;{game.awayTeam && game.awayTeam.odds && game.awayTeam.odds.us && `(${game.awayTeam.odds.us})`}
									</TableCell>
									<TableCell>
										{game.homeTeam && game.homeTeam.full}
										&nbsp;{game.homeTeam && game.homeTeam.odds && game.homeTeam.odds.us && `(${game.awayTeam.odds.us})`}
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
	loadGame(e, props) {
		let gameId = e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.gameId
		if(gameId) {
				this.props.history.push(`game/${gameId}`)
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

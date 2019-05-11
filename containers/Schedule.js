import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchedule } from '../actions/main'
import Nav from '../components/Nav'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
		// TODO: remove <Link>s, add clicks to entire rows

		const games = this.props.schedule.proGames.map((proGame) => {
			// check for dupes
			return proGame
		})
		return (
			<Paper style={{maxWidth:'700px', margin: 'auto'}}>
				<Nav />
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
							let gameDate = new Date(game['game_time_local'])
							return (
								<TableRow key={game['game_pk']}>
									<TableCell>
										<Link to={`/game/${game['game_pk']}`}>
											{game['away_team_full']}
										</Link>
									</TableCell>
									<TableCell>
										<Link to={`/game/${game['game_pk']}`}>
											{game['home_team_full']}
										</Link>
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

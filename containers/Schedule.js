import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchedule } from '../actions/main'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Schedule extends Component {
	componentDidMount() {
		this.props.dispatch(fetchSchedule())
	}
	render() {
		const games = this.props.schedule.proGames.map((proGame) => {
			// check for dupes
			return proGame
		})
		return (
			<div>
				<p>Schedule View</p>			
				{ games.length === 0 &&
					`Loading, or whatever.`
				}
				<ul>
				{ games.map((game) => {
					let gameDate = new Date(game['game_time_local'])
					return (
						<li key={game['game_pk']}>
							<Link to={`/game/${game['game_pk']}`}>
							{game['away_team_abbrev']} 
							@ 
							{game['home_team_abbrev']} 
							-- 
							{game.gameId}
							({gameDate.toLocaleTimeString()})
							</Link>
						</li>
					)
				}
				)}
				</ul>
			</div> 
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
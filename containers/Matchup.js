import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame, fetchSchedule, makeScheduleCall } from '../actions/main'
import { LOAD_GAME } from '../types/main'
import { Link } from 'react-router-dom'


class Matchup extends Component {
	render() {
		const game = this.props.schedule.game
		console.log('the game though:', game)
		return (

			<div>
				<p>Matchup View</p>
				<p><Link to={`/`}>Schedule</Link></p>
				<div className="team away" style={ { float:"left", width:"50%" } }>	
				{ game && game['away_team_abbrev'] }
				</div>
				
				<div className="team home" style={ { float:"left", width:"50%" } }>	
				{ game && game['home_team_abbrev'] }
				</div>
				<Pitcher team={game && game['away_team_abbrev']} />
				<Batters team={game && game['home_team_abbrev']} />
				<Pitcher team={game && game['home_team_abbrev']} />
				<Batters team={game && game['away_team_abbrev']} />
			</div> //
		)
	}

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
			dispatch(fetchGame(match.params.id))
		})
		console.log('oh, hai props:', this.props)
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
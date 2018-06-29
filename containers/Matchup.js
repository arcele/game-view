import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame, fetchSchedule, makeScheduleCall } from '../actions/main'
import { LOAD_GAME } from '../types/main'


class Matchup extends Component {
	render() {
		const game = this.props.schedule.game
		console.log('the game though:', game)
		const awayTeam = game && game.competitors ? game.competitors[1] : null
		const homeTeam = game && game.competitors ? game.competitors[0] : null
		return (
			<div style={{width:"300px"}}>
				
						
					<div className="team away" style={ { float:"left", width:"50%" } }>	
						{ awayTeam && awayTeam.abbreviation }
						<div style={
							{
								float:"left",
								width:"60px",
								height:"60px",
								backgroundImage:awayTeam && awayTeam.team.logos ? `url(${awayTeam.team.logos[3].href})` : 'url(n)',
								backgroundPosition: "5px 5px",
								backgroundSize:"50px",
								backgroundColor: awayTeam && awayTeam.team ? '#' + awayTeam.team.color : 'black',
//								borderColor: awayTeam && awayTeam.team ? '#' + awayTeam.team.secondaryColor : 'grey',
								border:"2px solid #" + (awayTeam && awayTeam.team ? awayTeam.team.alternateColor : '333'),
								backgroundRepeat:"no-repeat",
								borderRadius:"30px"
							}	
						}>&nbsp;</div>
					</div>
					@ 
					<div className="team home" style={ { float:"left", width:"50%" } }>	
						
						<div style = {
							{
								float:"right",
								width:"60px",
								height:"60px",
								backgroundImage:homeTeam && homeTeam.team.logos ? `url(${homeTeam.team.logos[3].href})` : 'url()',
								backgroundPosition: "5px 5px",
								backgroundSize:"50px",
								backgroundColor: homeTeam && homeTeam.team ? '#' + homeTeam.team.color : 'black',
								backgroundRepeat:"no-repeat",
								borderRadius:"30px",
								border:"2px solid #" + (homeTeam && homeTeam.team ? homeTeam.team.alternateColor : '333'),
							}
						}>&nbsp;</div>
						{ homeTeam && homeTeam.team.abbreviation }
					</div>
				<Pitcher team={awayTeam} />
				<Batters team={homeTeam} />
				<Pitcher team={homeTeam} />
				<Batters team={awayTeam} />
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
	}
}

Matchup.propTypes = { 
	dispatch: PropTypes.func.isRequired,
	schedule: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	return {
		schedule: state.gameView.schedule,
	}
}

export default connect(mapStateToProps)(Matchup)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame } from '../actions/main'


class Matchup extends Component {
	render() {
		const game = this.props.game
		console.log('the game though:', game)
		const awayTeam = game && game.competitors ? game.competitors[1] : null
		const homeTeam = game && game.competitors ? game.competitors[0] : null
		return (
			<div>
				<p>
					{ awayTeam && awayTeam.team.abbreviation } 
					@ 
					{ homeTeam && homeTeam.team.abbreviation }
				</p>
				<Pitcher team={awayTeam} />
				<Batters team={homeTeam} />
				<Pitcher team={homeTeam} />
				<Batters team={awayTeam} />
			</div> //
		)
	}

	componentDidMount() {
		this.props.dispatch(fetchGame(this.props.match.params.id))
	}
}

Matchup.propTypes = { 
	dispatch: PropTypes.func.isRequired,
	game: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
	return {
		game: state.gameView.game,
	}
}

export default connect(mapStateToProps)(Matchup)
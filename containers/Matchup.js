import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame } from '../actions/main'


class Matchup extends Component {
	render() {
		const game = this.props.game
		return (
			<div>
				<p>Matchup View</p>
				<Pitcher />
				<Batters />
				<Pitcher />
				<Batters />
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
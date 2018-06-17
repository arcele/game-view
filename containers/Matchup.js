import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'
import { fetchGame } from '../actions/main'


class Matchup extends Component {
	render() {
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
		console.log('fetch the matchup data to feed to other components.', this.props)
		this.props.dispatch(fetchGame(this.props.match.params.id, this.props.schedule.proGames))
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
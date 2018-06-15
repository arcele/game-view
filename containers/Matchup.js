import React, { Component } from 'react'
import Pitcher from '../components/Pitcher'
import Batters from '../components/Batters'

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
		console.log('fetch the matchup data to feed to other components.')
	}
}

export default Matchup
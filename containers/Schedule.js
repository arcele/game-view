import React, { Component } from 'react'

class Matchup extends Component {
	render() {
		return (
			<div>
				<p>Schedule View</p>
			</div> //
		)
	}

	componentDidMount() {
		console.log('fetch the schedule data.')
	}
}

export default Matchup
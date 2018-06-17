import React, { Component } from 'react'

class Pitcher extends Component {
	render() {
		const probable = this.props.team && this.props.team.probables && this.props.team.probables.length ? this.props.team.probables[0] : null
		return (
			<p>{ probable && probable.athlete.displayName } </p>
		)
	}
}

export default Pitcher
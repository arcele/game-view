import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSchedule } from '../actions/main'
import PropTypes from 'prop-types'

class Schedule extends Component {
	render() {
		return (
			<div>
				<p>Schedule View</p>
			</div> 
		)
	}

	componentDidMount() {
		this.props.dispatch(fetchSchedule())
	}
}

Schedule.propTypes = { dispatch: PropTypes.func.isRequired }


const mapStateToProps = (state) => {
	return state.gameView.schedule
}

export default connect(mapStateToProps)(Schedule)
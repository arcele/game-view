import React, {Component} from 'react';
import Matchup from './Matchup'
import Schedule from './Schedule'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

class App extends Component {
	render () {
		return(
			<div id="matchup-frame">
				<Route exact path="/" component={Schedule}/>
				<Route exact path="/game/:id" component={Matchup} />
			</div>//
		)
	}

	componentDidMount() {

	}
}

export default App
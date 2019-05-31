import React, {Component} from 'react';
import Matchup from './Matchup'
import Schedule from './Schedule'
import { Router, Route, Link, withRouter } from 'react-router';
import { createBrowserHistory } from "history";

import PropTypes from 'prop-types'

class App extends Component {


	render () {
		const gameViewHistory = createBrowserHistory();

		return(
			<Router history={gameViewHistory}>
				<div id="matchup-frame">
					<Route exact path="/" component={Schedule}/>
					<Route exact path="/schedule/" component={Schedule} />
					<Route exact path="/schedule/:date" component={Schedule} />
					<Route exact path="/game/:id" component={Matchup} />
				</div>
			</Router>
		)

	}

	componentDidMount() {

	}
}

export default App

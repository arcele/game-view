import React, {Component} from 'react';
import Matchup from './Matchup'
import Schedule from './Schedule'
import { Route } from 'react-router-dom'

export default class App extends Component {
    render () {
    	return(
    		<div id="matchup-frame">
    			<Route exact path="/" component={Schedule} />
	    		<Route exact path="/:id" component={Matchup} />
	    	</div>
    	)
    }
}
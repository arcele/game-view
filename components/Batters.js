import React, { Component } from 'react'

class Batters extends Component {
	render() {
		const players = this.props.players || []
		return (
			<div>
				<table>
					<thead>
						<tr>
							<td>{this.props.team} Batters</td>
							<td>H/AB</td>
							<td>AVG</td>
							<td>HR</td>
							<td>SLG</td>
						</tr>
					</thead>
					<tbody>
					{ players.map((player) => 
						player && player.b_tpa && (<tr>
							<td>{player.name}</td>
							<td>{player.b_total_hits} / { player.b_ab}</td>
							<td>{player.b_batting_avg}</td>
							<td>{player.b_home_run}</td>
							<td>{player.b_slugging_avg}</td>
						</tr>)
					)}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Batters
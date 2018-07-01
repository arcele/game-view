import React, { Component } from 'react'

class Batters extends Component {
	render() {
		const players = this.props.players || []
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>{this.props.team} Batters</th>
							<th>H/AB</th>
							<th>AVG</th>
							<th>HR</th>
							<th>SLG</th>
						</tr>
					</thead>
					<tbody>
						{ players.length === 0 && (
							<tr colSpan="5"><td>Loading</td></tr>
						)}
						{ players.map((player) => 
							(<tr key={player.player_id}>
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
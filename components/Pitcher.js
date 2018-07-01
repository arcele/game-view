import React, { Component } from 'react'

class Pitcher extends Component {
	render() {
		const { team, pitcher } = this.props
		const statIds = {
			"W": 53,
			"L": 54,
			"ERA": 47,
			"WHIP": 41,
			"K/9": 49,
		}
		const stats = (pitcher && pitcher.data && pitcher.data.currentSeasonRealStats) ? pitcher.data.currentSeasonRealStats.rawStats : {}

		return (
			<table>
				<thead>
					<tr>
						<th>{ team} Starting Pitcher</th>
						<th>W-L</th>
						<th>ERA</th>
						<th>WHIP</th>
						<th>K/9</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{ pitcher && pitcher.fullName }</td>
						<td>{ stats && stats[statIds["W"]] }-{ stats && stats[statIds["L"]] }</td>
						<td>{ stats && stats[statIds["ERA"]] }</td>
						<td>{ stats && stats[statIds["WHIP"]] }</td>
						<td>{ stats && stats[statIds["K/9"]] }</td>					
					</tr>
				</tbody>
			</table>
		)
	}
}

export default Pitcher
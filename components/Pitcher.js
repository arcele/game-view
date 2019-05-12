import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell colspan={4}>{ pitcher && pitcher.fullName }</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>W-L</TableCell>
						<TableCell>ERA</TableCell>
						<TableCell>WHIP</TableCell>
						<TableCell>K/9</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>{ stats && stats[statIds["W"]] }-{ stats && stats[statIds["L"]] }</TableCell>
						<TableCell>{ stats && stats[statIds["ERA"]] }</TableCell>
						<TableCell>{ stats && stats[statIds["WHIP"]] }</TableCell>
						<TableCell>{ stats && stats[statIds["K/9"]] }</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
}

export default Pitcher

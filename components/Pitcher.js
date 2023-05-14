import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Player from './Player'

class Pitcher extends Component {
	render() {
		const { team, pitcher } = this.props
		const stats = pitcher && pitcher.stats

		return (
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell colSpan={4}><Player player={pitcher} team={team} /></TableCell>
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
						<TableCell>{ stats && stats['wins'] }-{ stats && stats['losses'] }</TableCell>
						<TableCell>{ stats && stats['era'] }</TableCell>
						<TableCell>{ stats && stats['whip'] }</TableCell>
						<TableCell>{ stats && stats['strikeoutsPer9Inn'] }</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
}

export default Pitcher

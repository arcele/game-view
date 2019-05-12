import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class Pitcher extends Component {
	render() {
		const { team, pitcher } = this.props
		const stats = pitcher && pitcher.data

		return (
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell colSpan={4}>{ pitcher && pitcher.fullName }</TableCell>
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
						<TableCell>{ stats && stats['w'] }-{ stats && stats['l'] }</TableCell>
						<TableCell>{ stats && stats['era'] }</TableCell>
						<TableCell>{ stats && stats['whip'] }</TableCell>
						<TableCell>{ stats && stats['k9'] }</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		)
	}
}

export default Pitcher

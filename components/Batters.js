import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Player from './Player'

class Batters extends Component {
	render() {
		// TODO: Handle case of no Results returned, but not 'loading' any more
		const players = this.props.players || []
		return (
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>{this.props.team && this.props.team.full && this.props.team.full.split(' ')[0]} Batters</TableCell>
							<TableCell>H/AB</TableCell>
							<TableCell>AVG</TableCell>
							<TableCell>HR</TableCell>
							<TableCell>SLG</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ players.length === 0 && (
							<TableRow>
								<TableCell colSpan="5" style={{textAlign:'center'}}>Loading...</TableCell>
							</TableRow>
						)}
						{ players.map((player) =>
							(<TableRow key={player.player_id}>
								<TableCell><Player player={player} team={this.props.team} /></TableCell>
								<TableCell>{player.b_total_hits} / { player.b_ab}</TableCell>
								<TableCell>{player.b_batting_avg}</TableCell>
								<TableCell>{player.b_home_run}</TableCell>
								<TableCell>{player.b_slugging_avg}</TableCell>
							</TableRow>)
						)}
					</TableBody>
				</Table>
		)
	}
}

export default Batters

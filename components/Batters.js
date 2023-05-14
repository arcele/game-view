import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Player from './Player'

class Batters extends Component {
	render() {
		const players = this.props.players || []
		const lineup = this.props.lineup || []
		let batter, batterStats

		return (
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Lineup Season Stats</TableCell>
							<TableCell>AVG</TableCell>
							<TableCell>OPS</TableCell>
							<TableCell>HR</TableCell>
							<TableCell>K</TableCell>

						</TableRow>
					</TableHead>
					<TableBody>
						{ players.length === 0 && (
							<TableRow>
								<TableCell colSpan="5" style={{textAlign:'center'}}>Lineup Not Available</TableCell>
							</TableRow>
						)}
						{ lineup && lineup.map((playerId) => {
								batter = players["ID" + playerId].person
							  batterStats = players["ID" + playerId].seasonStats.batting
								return (<TableRow key={playerId}>
									<TableCell>{batter && batter.fullName}</TableCell>
									<TableCell>{batterStats && batterStats['avg']}</TableCell>
									<TableCell>{batterStats && batterStats['ops']}</TableCell>
									<TableCell>{batterStats && batterStats['homeRuns']}</TableCell>
									<TableCell>{batterStats && batterStats['strikeOuts']}</TableCell>

								</TableRow>)
							}
						)}
					</TableBody>
				</Table>
		)

		/*
		{ lineup && lineup.map((player) =>
			(<TableRow key={player.player_id}>
				<TableCell><Player player={player} team={this.props.team} /></TableCell>
				<TableCell>{player.b_total_hits} / { player.b_ab}</TableCell>
				<TableCell>{player.b_batting_avg}</TableCell>
				<TableCell>{player.b_home_run}</TableCell>
				<TableCell>{player.b_slugging_avg}</TableCell>
			</TableRow>)
		)}
		*/
	}
}

export default Batters

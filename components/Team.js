import React, { Component } from 'react'
import { connect } from 'react-redux'
import Odds from './Odds'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import _ from 'lodash'

class Team extends Component {
  render() {
    let team = this.props.team,
        standings = this.getTeamStandings(),
        rowClass = '',
        splitRecords,
        lastTen;

    return(
      <React.Fragment>
        <Grid className="team" container spacing={1}>
          <Grid item xs={3}>
            <img className="teamLogo" style={{height:75, marginTop:20}} src={team && "https://www.mlbstatic.com/team-logos/" + team.id + ".svg"} />
            <Odds odds={team && team.odds} format='us' />
          </Grid>
          <Grid item xs={9}>
            <Table className="standings">
              <TableBody>
              { standings && standings.teamRecords && standings.teamRecords.map((sTeam) => {
                  rowClass = (team.id === sTeam.team.id) ? 'thisTeam' : 'team'
                  splitRecords = sTeam.records.splitRecords
                  lastTen = _.find(splitRecords, {type: "lastTen"})
                  return(
                    <TableRow className={rowClass}>
                      <TableCell>
                        {sTeam.team.name}
                      </TableCell>
                      <TableCell>
                        <span className="record">{sTeam.leagueRecord.wins}-{sTeam.leagueRecord.losses}</span>
                      </TableCell>
                      <TableCell>
                        <span className="record">{lastTen.wins}-{lastTen.losses}</span>
                      </TableCell>
                      <TableCell>
                        <span className="record">{sTeam.streak.streakCode}</span>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  getTeamStandings() {
    let out = []
    Object.keys(this.props.standings).forEach((leagueId) => {
        this.props.standings && this.props.standings[leagueId].forEach((division) => {
          division.teamRecords.forEach((team) => {
      			if(team &&  this.props.team && team.team.id === this.props.team.id) {
              out = division
            }
          })
        })
    })
    return out
  }
}

const mapStateToProps = (state) => {
	return {
		standings: state.gameView.standings,
	}
}

export default connect(mapStateToProps)(Team)

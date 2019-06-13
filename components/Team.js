import React, { Component } from 'react'
import { connect } from 'react-redux'
import Odds from './Odds'

class Team extends Component {
  render() {
    let team = this.props.team;
    let standings = this.getTeamStandings();
    return(
      <React.Fragment>
        <img style={{height:75}} src={team && "https://www.mlbstatic.com/team-logos/" + team.id + ".svg"} />
        <Odds odds={team && team.odds} format='us' />
        { team && team.full }
        <span className="record">
        { team && team.record && `(${team.record.wins}-${team.record.losses})` }
        </span>
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

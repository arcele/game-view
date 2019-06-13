import React, { Component } from 'react'
import { connect } from 'react-redux'
import Odds from './Odds'

class Team extends Component {
  render() {
    console.log('team:', this)
    let team = this.props.team;
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
}

const mapStateToProps = (state) => {
	return {
		standings: state.gameView.standings,
	}
}

export default connect(mapStateToProps)(Team)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment'

import { makeTeamScheduleCall, getTeam } from '../actions/main'

class Player extends Component {
  render() {
    let player     = this.props && this.props.player,
        playerName = player && player.name || player && player.lastFirstName, // different apis have different player names
        team       = this.props.team && this.props.teams[this.props.team.id],
        teamDates  = team && team.dates && team.dates.slice(0).reverse(),
        isActive   = this.props.schedule && this.props.schedule.player && player && this.getPlayerId() && this.props.schedule.player.id == this.getPlayerId(),
        gamesLog   = isActive && this.getGamesLog(),
        isLoaded   = (teamDates && player && gamesLog && gamesLog.length >= teamDates.length);

    const HtmlTooltip = withStyles(theme => ({
      tooltip: {
        backgroundColor: '#e0e0e0',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #c0c0c0',
        width: 350,
        height: 275,
        overflow: 'scroll',
      },
    }))(Tooltip);

    return(
      <HtmlTooltip
        interactive
        onOpen={this.loadPlayer.bind(this)}
        title={
          <React.Fragment>
            <div>{this.props.statePlayer.firstLastName}</div>
            { !isLoaded && <LinearProgress style={{marginTop:25}}/> }
            { isLoaded &&
              <React.Fragment>
                <Table className="standings">
                  <TableHead>
                    <TableRow key="standings-header">
                      <TableCell>Date</TableCell>
                      <TableCell style={{textAlign:'right'}}>Opp</TableCell>
                      {player && player.primaryPosition && player.primaryPosition.code == "1" &&
                        (
                          <React.Fragment>
                            <TableCell>Res</TableCell>
                            <TableCell>IP</TableCell>
                            <TableCell>ER</TableCell>
                            <TableCell>K</TableCell>
                          </React.Fragment>
                        )
                      } {player && !player.primaryPosition &&
                        (
                          <React.Fragment>
                            <TableCell>H/AB</TableCell>
                            <TableCell>HR</TableCell>
                            <TableCell>RBI</TableCell>
                            <TableCell>Bases</TableCell>
                          </React.Fragment>
                        )
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  { gamesLog && gamesLog.map((gameLog) => {
                      let game     = gameLog.game,
                          day      = gameLog.day,
                          boxScore = this.props.boxscores[game.gamePk],
                          stats    = boxScore && (boxScore.teams.away.players["ID" + this.props.statePlayer.id] || boxScore.teams.home.players["ID" + this.props.statePlayer.id]),
                          battingStats = stats && stats.stats && stats.stats.batting,
                          pitchingStats = stats && stats.stats && stats.stats.pitching;

                          if(player && player.primaryPosition && player.primaryPosition.code == "1") { // Pitcher
                            if(pitchingStats && pitchingStats.inningsPitched) {
                              return(
                                <TableRow key={game.id}>
                                  <TableCell key={game.id + 'date'}>{moment(day.date).format('MM-DD')}</TableCell>
                                  <TableCell key={game.id + 'opp'} style={{textAlign:'right'}}>{this.formatOpp(game)}</TableCell>
                                  <TableCell key={game.id + 'note'}>{ pitchingStats && pitchingStats.note }</TableCell>
                                  <TableCell key={game.id + 'ip'}>{ pitchingStats && pitchingStats.inningsPitched }</TableCell>
                                  <TableCell key={game.id + 'er'}>{ pitchingStats && pitchingStats.earnedRuns }</TableCell>
                                  <TableCell key={game.id + 'k'}>{ pitchingStats && pitchingStats.strikeOuts }</TableCell>
                                </TableRow>
                              )
                            }
                          } else {
                            return(
                              <TableRow key={game.id}>
                                <TableCell key={game.id + 'date'}>{moment(day.date).format('MM-DD')}</TableCell>
                                <TableCell key={game.id + 'opp'} style={{textAlign:'right'}}>{this.formatOpp(game)}</TableCell>
                                { battingStats && battingStats.atBats > 0 && (
                                  <React.Fragment>
                                    <TableCell key={game.id + 'hab'}>{ battingStats.hits +'/'+battingStats.atBats }</TableCell>
                                    <TableCell key={game.id + 'hr'}>{ battingStats.homeRuns }</TableCell>
                                    <TableCell key={game.id + 'rbi'}>{ battingStats.rbi }</TableCell>
                                    <TableCell key={game.id + 'tb'}>{ battingStats.totalBases }</TableCell>
                                  </React.Fragment>
                                ) }
                                { (!battingStats || !battingStats.atBats || battingStats.atBats == 0) && (
                                  <TableCell colSpan={4}>&nbsp;</TableCell>
                                )}

                              </TableRow>
                            )
                          }
                      }
                  ) }
                  </TableBody>
                </Table>
              </React.Fragment>
            }
          </React.Fragment>
        }>
          <span>
            {player && playerName.split(',')[1].charAt(1)}. {player && playerName.split(',')[0]}
          </span>
      </HtmlTooltip>
    )
  }

  getGamesLog() {
    let boxscore,
        stats = [],
        gameStats,
        playerId = this.getPlayerId(),
        team = this.props.team && this.props.teams[this.props.team.id],
        teamDates = team && team.dates && team.dates.slice(0).reverse();

    teamDates && teamDates.map((day) => (
        day && day.games.map((game) => {
          boxscore  = this.props.boxscores[game.gamePk];
          gameStats = boxscore && (boxscore.teams.away.players["ID" + playerId]);
          console.log('gameStats:', gameStats)
          if(boxscore) {
            stats.push({ day: day, game: game, stats})
          }
        })
    ))
    return stats;
  }

  getPlayerId() {
    return this.props.player && (this.props.player.id || this.props.player['player_id'])
  }

  loadPlayer() {
    let loadedPlayer = this.props.schedule && this.props.schedule.player
    if(!loadedPlayer.id || (loadedPlayer.id != this.props.player.id && loadedPlayer.id != parseInt(this.props.player['player_id']))) {
      // Load the player if he's not already loaded
      this.props.dispatch({
        type: 'LOAD_PLAYER',
        id: this.props.player.id || parseInt(this.props.player['player_id']),
        team: this.props.team,
      })
      if(!this.props.teams.hasOwnProperty(this.props.team.id)) {
        this.props.dispatch({ type: 'INIT_TEAM', id: this.props.team.id })
        makeTeamScheduleCall(this.props.dispatch, this.props.team.id)
      }
    }
  }

  formatOpp(game) {
    let homeTeam = getTeam(game.teams.home.team.id),
        awayTeam = getTeam(game.teams.away.team.id)
    if(awayTeam.id === this.props.team.id) {
      return(<span>@ { homeTeam.abbreviation }</span>)
    } else {
      return(<span>{ awayTeam.abbreviation }</span>)
    }
  }
}

const mapStateToProps = (state) => {
	return {
    schedule: state.gameView.schedule,
    statePlayer: state.gameView.schedule.player,
		standings: state.gameView.standings,
    teams: state.gameView.teams,
    boxscores: state.gameView.boxscores,
	}
}

export default connect(mapStateToProps)(Player)

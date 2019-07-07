import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

class Player extends Component {
  render() {
    let player = this.props && this.props.player,
        playerName = player && player.name || player && player.lastFirstName // different apis have different player names

    const HtmlTooltip = withStyles(theme => ({
      tooltip: {
        backgroundColor: '#e0e0e0',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #c0c0c0',
        width: 350,
        height: 275
      },
    }))(Tooltip);

    return(
      <HtmlTooltip
        interactive
        onOpen={this.loadPlayer.bind(this)}
        title={
          <React.Fragment>
            <span>{this.props.statePlayer.firstLastName}</span>
            <LinearProgress style={{marginTop:25}}/>
          </React.Fragment>
        }>
          <span>
            {player && playerName.split(',')[1].charAt(1)}. {player && playerName.split(',')[0]}
          </span>
      </HtmlTooltip>
    )
  }

  loadPlayer() {
    this.props.dispatch({
      type: 'LOAD_PLAYER',
      id: this.props.player.id || parseInt(this.props.player['player_id']),
      team: this.props.team,
    })
    if(!this.props.teams.hasOwnProperty(this.props.team.id)) {
      this.props.dispatch({ type: 'INIT_TEAM', id: this.props.team.id })
    }
  }
}

const mapStateToProps = (state) => {
	return {
    statePlayer: state.gameView.schedule.player,
		standings: state.gameView.standings,
    teams: state.gameView.teams,
	}
}

export default connect(mapStateToProps)(Player)

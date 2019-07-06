import React, { Component } from 'react'

class Player extends Component {
  render() {
    let player = this.props && this.props.player,
        playerName = player && player.name || player && player.lastFirstName // different apis have different player names
    return(
      <span>
        {player && playerName.split(',')[1].charAt(1)}. {player && playerName.split(',')[0]}
      </span>
    )
  }
}

export default Player

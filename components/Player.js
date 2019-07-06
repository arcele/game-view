import React, { Component } from 'react'

class Player extends Component {
  render() {
    let player = this.props && this.props.player
    console.log('player:', player)
    return(
      <span>
        {player && player.name.split(',')[1].charAt(1)}. {player && player.name.split(',')[0]}!
      </span>
    )
  }
}

export default Player

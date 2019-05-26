import React, { Component } from 'react'

class Odds extends Component {
  render() {
    let data = this.props.odds,
        format = this.props.format ? this.props.format : 'us'; //default to us
    console.log('Odds Data:', data, this.props)
    if(data) {
      return(
          <span className="odds" data-euro-rounded={Math.round(data.eur)}>
            { `(${data[format]})` }
          </span>
      )
    } else {
      return <span className="odds" />
    }
  }

}

export default Odds

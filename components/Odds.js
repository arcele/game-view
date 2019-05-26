import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip';

class Odds extends Component {
  render() {
    let data = this.props.odds,
        format = this.props.format ? this.props.format : 'us', //default to us
        toolTipText = ''
        this.props.odds && this.props.odds.sites && this.props.odds.sites.forEach((site) => {
          toolTipText += `${site.site_key} : ${site.odds.us} \n`
        })
    if(data) {
      return(
        <Tooltip title={toolTipText}>
            <span className="odds" data-euro-rounded={Math.round(data.eur)}>
                { `(${data[format]})` }
            </span>
        </Tooltip>
      )
    } else {
      return <span className="odds" />
    }
  }

}

export default Odds

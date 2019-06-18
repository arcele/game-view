import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'


class Odds extends Component {
  render() {
    let data = this.props.odds,
        format = this.props.format ? this.props.format : 'us'; //default to us

    if(data) {
      const HtmlTooltip = withStyles(theme => ({
        tooltip: {
          backgroundColor: '#e0e0e0',
          color: 'rgba(0, 0, 0, 0.87)',
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #c0c0c0',
          width: 125,
        },
      }))(Tooltip);

      return(
        <HtmlTooltip
          interactive
          title={
            <Grid container spacing={1}>
              {this.props.odds && this.props.odds.sites && this.props.odds.sites.map((site) => {
                return(
                  <React.Fragment key={site.site_key}>
                    <Grid item xs={8} style={{textAlign: 'right'}}>
                      {site.site_key}
                    </Grid>
                    <Grid item xs={4}>
                      <span className="odds" data-euro-rounded={Math.round(site.odds.eur)}>
                        {site.odds[format]}
                      </span>
                    </Grid>
                  </React.Fragment>
                )
              })}
            </Grid>
          }>
          <span className="odds" data-euro-rounded={Math.round(data.eur)}>
              { `(${data[format]})` }
          </span>
        </HtmlTooltip>
      )

    } else {
      return <span className="odds" />
    }
  }

}

export default Odds

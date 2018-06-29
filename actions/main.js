import { SAVE_SCHEDULE, SAVE_GAME, SAVE_PROBABLE_STARTERS } from '../types/main'
import fetch from 'isomorphic-fetch'


export const savePlayer = (player) => {
  return dispatch => {
    dispatch({
       type: 'STORE_PLAYER',
       data: {
        player
       }
    })
  }
}

export const fetchSchedule = () => {
	const gameDate = new Date().toISOString().split('T')[0].replace(/-/g,'')
	const gameYear = new Date().getFullYear()
	const scheduleApi = `http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='H'&start_date='${gameDate}'&end_date='${gameDate}'&season='${gameYear}'`
	return dispatch => {
		fetch(scheduleApi).then((response) => {
			return response.json()
		}).then((resJson) => {
			dispatch({type: SAVE_SCHEDULE, games: resJson['mlb_broadcast_info']['queryResults']['row'] })
		})
	}
}

export const fetchGame = (id) => {
	// we need to fetch the entire schedule if we don't ahve it first
	return dispatch => {
		const probableApi = `https://statsapi.mlb.com/api/v1/schedule?gamePk=${id}&language=en&hydrate=lineups,broadcasts(all),probablePitcher(note),game(tickets)&useLatestGames=true&fields=dates,games,teams,probablePitcher,note,id,dates,games,broadcasts,type,name,homeAway,isNational,dates,games,game,tickets,ticketType,ticketLinks,dates,games,lineups,homePlayers,awayPlayers,useName,lastName,primaryPosition,abbreviation`

		// fetch returns a promise, so, let's make a couple of fetches and then do a Promise.all?

		// this fetch gets and saves the probable pitchers for the game, we'll need to get the
		// opposing teams bvp data using the bvpApi for both teams.
		fetch(probableApi).then((res) => {
			return res.json()
		}).then((probableData) => {
			const away = probableData.dates[0].games[0].teams.away.probablePitcher.id
			const home = probableData.dates[0].games[0].teams.home.probablePitcher.id
			const awayTeam =  probableData.dates[0].games[0].teams.away
			console.log('probableData:', probableData)
			dispatch({type: SAVE_PROBABLE_STARTERS, gameId: id, starters: {away, home}})
//			const bvpApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${home}&game_type=%27R%27&team_id=${awayTeam.id}&year=2018`
//			console.log('hit:', bvpApi)
		})

		const gameApi = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live?language=en`
		// get all of our other neat game data here.
	}
}

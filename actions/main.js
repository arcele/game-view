import { SAVE_SCHEDULE, SAVE_GAME, SAVE_PROBABLE_STARTERS, REQUEST_SCHEDULE, SAVE_BVP_DATA } from '../types/main'
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

export const makeScheduleCall = (gameDate, season, dispatch) => {
	// make schedule call, return a promise that resolves with the contents of the schedule
	const scheduleApi = `http://lookup-service-prod.mlb.com/json/named.mlb_broadcast_info.bam?src_type='TV'&tcid=mm_mlb_schedule&sort_by='game_time_et_asc'&home_away='H'&start_date='${gameDate}'&end_date='${gameDate}'&season='${season}'`
	return new Promise((resolve) => {
		fetch(scheduleApi).then((response) => {
			return response.json()
		}).then((resJson) => {
			if(dispatch) {
				dispatch({type: SAVE_SCHEDULE, games: resJson['mlb_broadcast_info']['queryResults']['row'] })
			}
			resolve(resJson)
		})
	})
}

export const fetchSchedule = () => {
	const gameDate = new Date().toISOString().split('T')[0].replace(/-/g,'')
	const gameYear = new Date().getFullYear()
	return dispatch => {
		dispatch({type: REQUEST_SCHEDULE})
		makeScheduleCall(gameDate, gameYear, dispatch)
	}
}

export const fetchGame = (game) => {
	return dispatch => {
		const id = game['game_pk']
		const probableApi = `https://statsapi.mlb.com/api/v1/schedule?gamePk=${id}&language=en&hydrate=lineups,broadcasts(all),probablePitcher(note),game(tickets)&useLatestGames=true&fields=dates,games,teams,probablePitcher,note,id,dates,games,broadcasts,type,name,homeAway,isNational,dates,games,game,tickets,ticketType,ticketLinks,dates,games,lineups,homePlayers,awayPlayers,useName,lastName,primaryPosition,abbreviation`
		fetch(probableApi).then((res) => {
			return res.json()
		}).then((probableData) => {
			const away = probableData.dates[0].games[0].teams.away.probablePitcher.id
			const home = probableData.dates[0].games[0].teams.home.probablePitcher.id
			dispatch({type: SAVE_PROBABLE_STARTERS, gameId: id, starters: {away, home}})
			const homePitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${home}&game_type=%27R%27&team_id=${game['away_team_id']}&year=2018`
			const awayPitcherApi = `https://lookup-service-prod.mlb.com/json/named.team_bvp_5y.bam?vs_pitcher_id=${away}&game_type=%27R%27&team_id=${game['home_team_id']}&year=2018`
			fetch(homePitcherApi).then((res) => {
				return res.json()
			}).then((homeData) => {
				dispatch({type: SAVE_BVP_DATA, pitcher: home, data: homeData})
				fetch(awayPitcherApi).then((awayRes) => {
					return awayRes.json()
				}).then((awayData) => {
					dispatch({type: SAVE_BVP_DATA, pitcher: away, data: awayData})
				})
			})
		})

		const gameApi = `https://statsapi.mlb.com/api/v1.1/game/${id}/feed/live?language=en`
		// get all of our other neat game data here.
	}
}

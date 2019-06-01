# game-view

Basic react app that will give you quick access to view Major League Baseball games.
The app hits a few different APIs to load up the MLB schedule, and upcoming betting odds.
Drilling into individual games will give you pitcher and BVP data.
Use this info to help you pick baseball games

To get access to the betting odds, you'll need an odds-api key, the key is free for 500 request/month
and this app will cache your betting odds daily to your local storage, so you shouldn't even approach
the free cap if you're using this only locally.  Get your key from here: https://the-odds-api.com/
Then from the project route

`mkdir config`

`cd config`

`echo "export default 'YOUR-THE-ODDS-API-KEY-HERE-WITH-QUOTE'" > apiKey.js`

If you don't do this, you just won't get betting odds.

Then

`yarn install`

`yarn start`

`http://localhost:8080`

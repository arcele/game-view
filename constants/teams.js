// static version of http://statsapi.mlb.com/api/v1/teams?sportId=1
// basically, some of the calls don't have the info we want, so for now
// we'll use this to grab the info when we don't have it

export default {
  "teams" : [ {
    "id" : 133,
    "name" : "Oakland Athletics",
    "link" : "/api/v1/teams/133",
    "venue" : {
      "id" : 10,
      "name" : "Oakland Coliseum",
      "link" : "/api/v1/venues/10"
    },
    "teamCode" : "oak",
    "fileCode" : "oak",
    "abbreviation" : "OAK",
    "teamName" : "Athletics",
    "locationName" : "Oakland",
    "firstYearOfPlay" : "1901",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 200,
      "name" : "American League West",
      "link" : "/api/v1/divisions/200"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Oakland",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 134,
    "name" : "Pittsburgh Pirates",
    "link" : "/api/v1/teams/134",
    "venue" : {
      "id" : 31,
      "name" : "PNC Park",
      "link" : "/api/v1/venues/31"
    },
    "teamCode" : "pit",
    "fileCode" : "pit",
    "abbreviation" : "PIT",
    "teamName" : "Pirates",
    "locationName" : "Pittsburgh",
    "firstYearOfPlay" : "1882",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 205,
      "name" : "National League Central",
      "link" : "/api/v1/divisions/205"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Pittsburgh",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 135,
    "name" : "San Diego Padres",
    "link" : "/api/v1/teams/135",
    "venue" : {
      "id" : 2680,
      "name" : "Petco Park",
      "link" : "/api/v1/venues/2680"
    },
    "teamCode" : "sdn",
    "fileCode" : "sd",
    "abbreviation" : "SD",
    "teamName" : "Padres",
    "locationName" : "San Diego",
    "firstYearOfPlay" : "1969",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 203,
      "name" : "National League West",
      "link" : "/api/v1/divisions/203"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "San Diego",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 136,
    "name" : "Seattle Mariners",
    "link" : "/api/v1/teams/136",
    "venue" : {
      "id" : 680,
      "name" : "T-Mobile Park",
      "link" : "/api/v1/venues/680"
    },
    "teamCode" : "sea",
    "fileCode" : "sea",
    "abbreviation" : "SEA",
    "teamName" : "Mariners",
    "locationName" : "Seattle",
    "firstYearOfPlay" : "1977",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 200,
      "name" : "American League West",
      "link" : "/api/v1/divisions/200"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Seattle",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 137,
    "name" : "San Francisco Giants",
    "link" : "/api/v1/teams/137",
    "venue" : {
      "id" : 2395,
      "name" : "Oracle Park",
      "link" : "/api/v1/venues/2395"
    },
    "teamCode" : "sfn",
    "fileCode" : "sf",
    "abbreviation" : "SF",
    "teamName" : "Giants",
    "locationName" : "San Francisco",
    "firstYearOfPlay" : "1883",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 203,
      "name" : "National League West",
      "link" : "/api/v1/divisions/203"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "San Francisco",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 138,
    "name" : "St. Louis Cardinals",
    "link" : "/api/v1/teams/138",
    "venue" : {
      "id" : 2889,
      "name" : "Busch Stadium",
      "link" : "/api/v1/venues/2889"
    },
    "teamCode" : "sln",
    "fileCode" : "stl",
    "abbreviation" : "STL",
    "teamName" : "Cardinals",
    "locationName" : "St. Louis",
    "firstYearOfPlay" : "1892",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 205,
      "name" : "National League Central",
      "link" : "/api/v1/divisions/205"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "St. Louis",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 139,
    "name" : "Tampa Bay Rays",
    "link" : "/api/v1/teams/139",
    "venue" : {
      "id" : 12,
      "name" : "Tropicana Field",
      "link" : "/api/v1/venues/12"
    },
    "teamCode" : "tba",
    "fileCode" : "tb",
    "abbreviation" : "TB",
    "teamName" : "Rays",
    "locationName" : "Tampa Bay",
    "firstYearOfPlay" : "1998",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 201,
      "name" : "American League East",
      "link" : "/api/v1/divisions/201"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Tampa Bay",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 140,
    "name" : "Texas Rangers",
    "link" : "/api/v1/teams/140",
    "venue" : {
      "id" : 13,
      "name" : "Globe Life Park in Arlington",
      "link" : "/api/v1/venues/13"
    },
    "teamCode" : "tex",
    "fileCode" : "tex",
    "abbreviation" : "TEX",
    "teamName" : "Rangers",
    "locationName" : "Arlington",
    "firstYearOfPlay" : "1961",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 200,
      "name" : "American League West",
      "link" : "/api/v1/divisions/200"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Texas",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 141,
    "name" : "Toronto Blue Jays",
    "link" : "/api/v1/teams/141",
    "venue" : {
      "id" : 14,
      "name" : "Rogers Centre",
      "link" : "/api/v1/venues/14"
    },
    "teamCode" : "tor",
    "fileCode" : "tor",
    "abbreviation" : "TOR",
    "teamName" : "Blue Jays",
    "locationName" : "Toronto",
    "firstYearOfPlay" : "1977",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 201,
      "name" : "American League East",
      "link" : "/api/v1/divisions/201"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Toronto",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 142,
    "name" : "Minnesota Twins",
    "link" : "/api/v1/teams/142",
    "venue" : {
      "id" : 3312,
      "name" : "Target Field",
      "link" : "/api/v1/venues/3312"
    },
    "teamCode" : "min",
    "fileCode" : "min",
    "abbreviation" : "MIN",
    "teamName" : "Twins",
    "locationName" : "Minneapolis",
    "firstYearOfPlay" : "1901",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 202,
      "name" : "American League Central",
      "link" : "/api/v1/divisions/202"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Minnesota",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 143,
    "name" : "Philadelphia Phillies",
    "link" : "/api/v1/teams/143",
    "venue" : {
      "id" : 2681,
      "name" : "Citizens Bank Park",
      "link" : "/api/v1/venues/2681"
    },
    "teamCode" : "phi",
    "fileCode" : "phi",
    "abbreviation" : "PHI",
    "teamName" : "Phillies",
    "locationName" : "Philadelphia",
    "firstYearOfPlay" : "1883",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 204,
      "name" : "National League East",
      "link" : "/api/v1/divisions/204"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Philadelphia",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 144,
    "name" : "Atlanta Braves",
    "link" : "/api/v1/teams/144",
    "venue" : {
      "id" : 4705,
      "name" : "SunTrust Park",
      "link" : "/api/v1/venues/4705"
    },
    "teamCode" : "atl",
    "fileCode" : "atl",
    "abbreviation" : "ATL",
    "teamName" : "Braves",
    "locationName" : "Atlanta",
    "firstYearOfPlay" : "1871",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 204,
      "name" : "National League East",
      "link" : "/api/v1/divisions/204"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Atlanta",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 145,
    "name" : "Chicago White Sox",
    "link" : "/api/v1/teams/145",
    "venue" : {
      "id" : 4,
      "name" : "Guaranteed Rate Field",
      "link" : "/api/v1/venues/4"
    },
    "teamCode" : "cha",
    "fileCode" : "cws",
    "abbreviation" : "CWS",
    "teamName" : "White Sox",
    "locationName" : "Chicago",
    "firstYearOfPlay" : "1901",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 202,
      "name" : "American League Central",
      "link" : "/api/v1/divisions/202"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Chi White Sox",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 146,
    "name" : "Miami Marlins",
    "link" : "/api/v1/teams/146",
    "venue" : {
      "id" : 4169,
      "name" : "Marlins Park",
      "link" : "/api/v1/venues/4169"
    },
    "teamCode" : "mia",
    "fileCode" : "mia",
    "abbreviation" : "MIA",
    "teamName" : "Marlins",
    "locationName" : "Miami",
    "firstYearOfPlay" : "1992",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 204,
      "name" : "National League East",
      "link" : "/api/v1/divisions/204"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Miami",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 147,
    "name" : "New York Yankees",
    "link" : "/api/v1/teams/147",
    "venue" : {
      "id" : 3313,
      "name" : "Yankee Stadium",
      "link" : "/api/v1/venues/3313"
    },
    "teamCode" : "nya",
    "fileCode" : "nyy",
    "abbreviation" : "NYY",
    "teamName" : "Yankees",
    "locationName" : "Bronx",
    "firstYearOfPlay" : "1903",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 201,
      "name" : "American League East",
      "link" : "/api/v1/divisions/201"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "NY Yankees",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 158,
    "name" : "Milwaukee Brewers",
    "link" : "/api/v1/teams/158",
    "venue" : {
      "id" : 32,
      "name" : "Miller Park",
      "link" : "/api/v1/venues/32"
    },
    "teamCode" : "mil",
    "fileCode" : "mil",
    "abbreviation" : "MIL",
    "teamName" : "Brewers",
    "locationName" : "Milwaukee",
    "firstYearOfPlay" : "1969",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 205,
      "name" : "National League Central",
      "link" : "/api/v1/divisions/205"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Milwaukee",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 108,
    "name" : "Los Angeles Angels",
    "link" : "/api/v1/teams/108",
    "venue" : {
      "id" : 1,
      "name" : "Angel Stadium",
      "link" : "/api/v1/venues/1"
    },
    "teamCode" : "ana",
    "fileCode" : "ana",
    "abbreviation" : "LAA",
    "teamName" : "Angels",
    "locationName" : "Anaheim",
    "firstYearOfPlay" : "1961",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 200,
      "name" : "American League West",
      "link" : "/api/v1/divisions/200"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "LA Angels",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 109,
    "name" : "Arizona Diamondbacks",
    "link" : "/api/v1/teams/109",
    "venue" : {
      "id" : 15,
      "name" : "Chase Field",
      "link" : "/api/v1/venues/15"
    },
    "teamCode" : "ari",
    "fileCode" : "ari",
    "abbreviation" : "ARI",
    "teamName" : "D-backs",
    "locationName" : "Phoenix",
    "firstYearOfPlay" : "1998",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 203,
      "name" : "National League West",
      "link" : "/api/v1/divisions/203"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Arizona",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 110,
    "name" : "Baltimore Orioles",
    "link" : "/api/v1/teams/110",
    "venue" : {
      "id" : 2,
      "name" : "Oriole Park at Camden Yards",
      "link" : "/api/v1/venues/2"
    },
    "teamCode" : "bal",
    "fileCode" : "bal",
    "abbreviation" : "BAL",
    "teamName" : "Orioles",
    "locationName" : "Baltimore",
    "firstYearOfPlay" : "1901",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 201,
      "name" : "American League East",
      "link" : "/api/v1/divisions/201"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Baltimore",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 111,
    "name" : "Boston Red Sox",
    "link" : "/api/v1/teams/111",
    "venue" : {
      "id" : 3,
      "name" : "Fenway Park",
      "link" : "/api/v1/venues/3"
    },
    "teamCode" : "bos",
    "fileCode" : "bos",
    "abbreviation" : "BOS",
    "teamName" : "Red Sox",
    "locationName" : "Boston",
    "firstYearOfPlay" : "1901",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 201,
      "name" : "American League East",
      "link" : "/api/v1/divisions/201"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Boston",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 112,
    "name" : "Chicago Cubs",
    "link" : "/api/v1/teams/112",
    "venue" : {
      "id" : 17,
      "name" : "Wrigley Field",
      "link" : "/api/v1/venues/17"
    },
    "teamCode" : "chn",
    "fileCode" : "chc",
    "abbreviation" : "CHC",
    "teamName" : "Cubs",
    "locationName" : "Chicago",
    "firstYearOfPlay" : "1874",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 205,
      "name" : "National League Central",
      "link" : "/api/v1/divisions/205"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Chi Cubs",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 113,
    "name" : "Cincinnati Reds",
    "link" : "/api/v1/teams/113",
    "venue" : {
      "id" : 2602,
      "name" : "Great American Ball Park",
      "link" : "/api/v1/venues/2602"
    },
    "teamCode" : "cin",
    "fileCode" : "cin",
    "abbreviation" : "CIN",
    "teamName" : "Reds",
    "locationName" : "Cincinnati",
    "firstYearOfPlay" : "1882",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 205,
      "name" : "National League Central",
      "link" : "/api/v1/divisions/205"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Cincinnati",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 114,
    "name" : "Cleveland Indians",
    "link" : "/api/v1/teams/114",
    "venue" : {
      "id" : 5,
      "name" : "Progressive Field",
      "link" : "/api/v1/venues/5"
    },
    "teamCode" : "cle",
    "fileCode" : "cle",
    "abbreviation" : "CLE",
    "teamName" : "Indians",
    "locationName" : "Cleveland",
    "firstYearOfPlay" : "1901",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 202,
      "name" : "American League Central",
      "link" : "/api/v1/divisions/202"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Cleveland",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 115,
    "name" : "Colorado Rockies",
    "link" : "/api/v1/teams/115",
    "venue" : {
      "id" : 19,
      "name" : "Coors Field",
      "link" : "/api/v1/venues/19"
    },
    "teamCode" : "col",
    "fileCode" : "col",
    "abbreviation" : "COL",
    "teamName" : "Rockies",
    "locationName" : "Denver",
    "firstYearOfPlay" : "1992",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 203,
      "name" : "National League West",
      "link" : "/api/v1/divisions/203"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Colorado",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 116,
    "name" : "Detroit Tigers",
    "link" : "/api/v1/teams/116",
    "venue" : {
      "id" : 2394,
      "name" : "Comerica Park",
      "link" : "/api/v1/venues/2394"
    },
    "teamCode" : "det",
    "fileCode" : "det",
    "abbreviation" : "DET",
    "teamName" : "Tigers",
    "locationName" : "Detroit",
    "firstYearOfPlay" : "1901",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 202,
      "name" : "American League Central",
      "link" : "/api/v1/divisions/202"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Detroit",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 117,
    "name" : "Houston Astros",
    "link" : "/api/v1/teams/117",
    "venue" : {
      "id" : 2392,
      "name" : "Minute Maid Park",
      "link" : "/api/v1/venues/2392"
    },
    "teamCode" : "hou",
    "fileCode" : "hou",
    "abbreviation" : "HOU",
    "teamName" : "Astros",
    "locationName" : "Houston",
    "firstYearOfPlay" : "1962",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 200,
      "name" : "American League West",
      "link" : "/api/v1/divisions/200"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Houston",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 118,
    "name" : "Kansas City Royals",
    "link" : "/api/v1/teams/118",
    "venue" : {
      "id" : 7,
      "name" : "Kauffman Stadium",
      "link" : "/api/v1/venues/7"
    },
    "teamCode" : "kca",
    "fileCode" : "kc",
    "abbreviation" : "KC",
    "teamName" : "Royals",
    "locationName" : "Kansas City",
    "firstYearOfPlay" : "1969",
    "league" : {
      "id" : 103,
      "name" : "American League",
      "link" : "/api/v1/league/103"
    },
    "division" : {
      "id" : 202,
      "name" : "American League Central",
      "link" : "/api/v1/divisions/202"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Kansas City",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 119,
    "name" : "Los Angeles Dodgers",
    "link" : "/api/v1/teams/119",
    "venue" : {
      "id" : 22,
      "name" : "Dodger Stadium",
      "link" : "/api/v1/venues/22"
    },
    "teamCode" : "lan",
    "fileCode" : "la",
    "abbreviation" : "LAD",
    "teamName" : "Dodgers",
    "locationName" : "Los Angeles",
    "firstYearOfPlay" : "1884",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 203,
      "name" : "National League West",
      "link" : "/api/v1/divisions/203"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "LA Dodgers",
    "springLeague" : {
      "id" : 114,
      "name" : "Cactus League",
      "link" : "/api/v1/league/114",
      "abbreviation" : "CL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 120,
    "name" : "Washington Nationals",
    "link" : "/api/v1/teams/120",
    "venue" : {
      "id" : 3309,
      "name" : "Nationals Park",
      "link" : "/api/v1/venues/3309"
    },
    "teamCode" : "was",
    "fileCode" : "was",
    "abbreviation" : "WSH",
    "teamName" : "Nationals",
    "locationName" : "Washington",
    "firstYearOfPlay" : "1969",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 204,
      "name" : "National League East",
      "link" : "/api/v1/divisions/204"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "Washington",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  }, {
    "id" : 121,
    "name" : "New York Mets",
    "link" : "/api/v1/teams/121",
    "venue" : {
      "id" : 3289,
      "name" : "Citi Field",
      "link" : "/api/v1/venues/3289"
    },
    "teamCode" : "nyn",
    "fileCode" : "nym",
    "abbreviation" : "NYM",
    "teamName" : "Mets",
    "locationName" : "New York",
    "firstYearOfPlay" : "1962",
    "league" : {
      "id" : 104,
      "name" : "National League",
      "link" : "/api/v1/league/104"
    },
    "division" : {
      "id" : 204,
      "name" : "National League East",
      "link" : "/api/v1/divisions/204"
    },
    "sport" : {
      "id" : 1,
      "link" : "/api/v1/sports/1",
      "name" : "Major League Baseball"
    },
    "shortName" : "NY Mets",
    "springLeague" : {
      "id" : 115,
      "name" : "Grapefruit League",
      "link" : "/api/v1/league/115",
      "abbreviation" : "GL"
    },
    "allStarStatus" : "N",
    "active" : true
  } ]
}

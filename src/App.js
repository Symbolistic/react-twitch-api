import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [streamerData, setStreamerData] = useState([]);

  useEffect( () => {
    ( async () => {
      const url = "https://wind-bow.glitch.me/twitch-api/streams/"
      const streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
      const data = await Promise.all(
        streamerList.map(value => 
          fetch(url + value).then(response => response.json())
        )
      );
  
      setStreamerData(data);
      console.log(streamerData);
    })()
  }, [])

  return (
    <div className="App">
      <h1 id="title">Twitch Streamers</h1>
      <div id="streamers">
      {(streamerData.length > 0) ? (
              streamerData.map((val) => {
                console.log(val)
                if (val.stream === null) {
                  const channelName = val._links.channel.split('/')
                  return (
                    <a key={channelName+1} className="results" href={`https://www.twitch.tv/${channelName[5]}`} target="_blank" rel="noopener noreferrer"  >
                      <div>
                      <h2 className="streamerName">{channelName[5]}</h2>
                      <p className="streamerStatus">Status: <strong style={{color: "#53535f"}}>Offline</strong></p>
                    </div></a>
                  );
                } else {
                  const channelName = val._links.channel.split('/')
                  console.log(`https://www.twitch.tv/${channelName[5]}`)
                  return (
                    <a key={channelName+1} className="results" href={`https://www.twitch.tv/${channelName[5]}`} target="_blank" rel="noopener noreferrer"  >
                      <div>
                        <h2 className="streamerName">{val.stream.channel.display_name}</h2>
                        <p>Status: <strong style={{color: "green"}}>Online</strong></p>
                        <p className="streamerStatus">Playing: {val.stream.channel.game}</p>
                    </div></a>
                  );
                }
              })
            ) : ('')}
      </div>
    </div>
  );
}

export default App;

import React from 'react'
import Episode from './Episode'

function Episodes({ episodes, handlePause, handlePlay }) {
  console.log(`episodes:`);
  console.log(episodes);
  return (
    episodes &&
    <div>
      {episodes.map(episode => (
        <div key={episode.trackId}>
          <Episode episode={episode} handlePause={handlePause} handlePlay={handlePlay} />
        </div>
      ))}
    </div>
  )
}

export default Episodes
import React from 'react'
import Episode from './Episode'

function Episodes({ episodes }) {
  console.log(`episodes:`);
  console.log(episodes);
  return (
    episodes &&
    <div>
      {episodes.map(episode => (
        <div key={episode.trackId}>
          <Episode episode={episode} />
        </div>
      ))}
    </div>
  )
}

export default Episodes
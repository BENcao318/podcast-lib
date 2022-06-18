import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

function PodcastDetails({ podcastDetails }) {
  const RSS_URL = podcastDetails.feedUrl;
  // useEffect(() => {
  //   console.log(RSS_URL);
  //   axios.get(`http://localhost:3000/api/v1/podcasts/${RSS_URL}`)
  //     .then(response => {
  //       console.log(`url::::::${response}`);
  //     })
  // }, [podcastDetails])

  return (
    <div className='max-w-xs'>
      <img src={podcastDetails.artworkUrl600} alt="podcast cover image" className='max-w-xs rounded-xl' />
      <h1>{podcastDetails.collectionName}</h1>
      <p>{podcastDetails.description}</p>
      <p>Description</p>
    </div>
  )
}

export default PodcastDetails
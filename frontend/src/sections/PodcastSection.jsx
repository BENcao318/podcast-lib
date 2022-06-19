import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PodcastDetails from '../components/PodcastDetails'
import axios from 'axios';
import Episodes from '../components/Episodes';

function PodcastSection({ handlePause, handlePlay }) {
  const [podcastDetails, setPodcastDetails] = useState({})
  const [episodes, setEpisodes] = useState([])
  const { id } = useParams();

  const getPodcastDetails = (collectionId) => {
    return axios.get(`http://localhost:3000/api/v1/podcasts/${collectionId}`)
  }

  // Get podcast details and episodes from the url by calling the backend api
  useEffect(() => {
    getPodcastDetails(id)
      .then((result) => {
        // console.log(result.data.results);
        setPodcastDetails(result.data.results[0]);
        setEpisodes(result.data.results.slice(1));
      })
  }, [id])

  return (
    <section className='flex mx-6 justify-center gap-12'>
      <PodcastDetails podcastDetails={podcastDetails} />
      <Episodes episodes={episodes} handlePause={handlePause} handlePlay={handlePlay} />
    </section>
  )
}

export default PodcastSection
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PodcastDetails from '../components/PodcastDetails'
import axios from 'axios';
import Episodes from '../components/Episodes';

function PodcastSection() {
  const [podcastDetails, setPodcastDetails] = useState({})
  const [episodes, setEpisodes] = useState([])
  const { id } = useParams();

  const getPodcastDetails = (collectionId) => {
    return axios.get(`http://localhost:3000/api/v1/podcasts/${collectionId}`)
  }

  useEffect(() => {
    getPodcastDetails(id)
      .then((result) => {
        console.log(result.data.results);
        setPodcastDetails(result.data.results[0]);
        setEpisodes(result.data.results.slice(1));
      })
  }, [])

  return (
    <section>
      <PodcastDetails podcastDetails={podcastDetails} />
      <Episodes episodes={episodes} />
    </section>
  )
}

export default PodcastSection
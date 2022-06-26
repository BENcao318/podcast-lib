import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PodcastDetails from '../components/PodcastDetails'
import loadingB from '../assets/loadingB.svg'
import axios from 'axios';
import Episodes from '../components/Episodes';

const serverURL = 'http://localhost:3000/api/v1'

function PodcastSection({ handlePause, handlePlay }) {
  const [podcastDetails, setPodcastDetails] = useState({})
  const [episodes, setEpisodes] = useState([])
  const [loadingContent, setLoadingContent] = useState(false)
  const { id } = useParams();

  const getPodcastDetails = (collectionId) => {
    setLoadingContent(true)
    return axios.get(`${serverURL}/podcasts/${collectionId}`)
  }

  // Get podcast details and episodes from the url by calling the backend api
  useEffect(() => {
    getPodcastDetails(id)
      .then((result) => {
        // console.log(result.data.results);
        setLoadingContent(false)
        setPodcastDetails(result.data.results[0])
        setEpisodes(result.data.results.slice(1))
      })
  }, [id])

  return (
    <div>
      {
        loadingContent ?
          <img src={loadingB} alt="loading animation" className='mx-auto mt-64' />
          :
          <section className='flex mx-6 justify-center gap-12'>
            <PodcastDetails podcastDetails={podcastDetails} />
            <Episodes episodes={episodes} handlePause={handlePause} handlePlay={handlePlay} />
          </section >
      }
    </div>
  )
}

export default PodcastSection
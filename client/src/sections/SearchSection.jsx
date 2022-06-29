import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Episodes from '../components/Episodes'
import Podcast from '../components/Podcast'
import axios from 'axios'
import { useState } from 'react'
import PodcastDetails from '../components/PodcastDetails'

const serverURL = 'http://localhost:3000/api/v1'

function SearchSection({ handlePlay, handlePause }) {
  const searchPodcastResult = useSelector((state) => state.search.searchPodcastResult)
  const searchEpisodeResult = useSelector((state) => state.search.searchEpisodeResult)

  const [podcastDetails, setPodcastDetails] = useState({})
  const [loadingContent, setLoadingContent] = useState(false)

  // console.log(`searchPodcastReuslt: ${searchPodcastResult}`);
  // console.log('result');

  const getPodcastDetails = (collectionId) => {
    setLoadingContent(true)
    return axios.get(`${serverURL}/podcasts/${collectionId}`)
  }

  useEffect(() => {
    if (searchPodcastResult.length !== 0) {
      getPodcastDetails(searchPodcastResult[0].collectionId)
        .then((response) => {
          setLoadingContent(false)
          setPodcastDetails(response.data.results[0])
        })
    }
  }, [searchPodcastResult])
  // console.log(searchEpisodeResult);
  return (
    <div className='grid mt-8'>
      <div className='place-self-center flex gap-12'>
        <div>
          <p className='font-semibold text-3xl text-left ml-4 mb-4'>Top Podcast Result: </p>
          <div>
            {
              loadingContent ?
                <span></span>
                :
                <section className='flex mx-6 justify-center gap-12'>
                  <PodcastDetails podcastDetails={podcastDetails} />
                </section >
            }
          </div>
        </div>
        <div>
          <p className='font-semibold text-3xl text-left mb-4'>Top Episode Result: </p>
          {searchEpisodeResult.length !== 0 && <Episodes episodes={searchEpisodeResult.slice(0, 4)} handlePlay={handlePlay} handlePause={handlePause} />}
        </div>
      </div>
    </div>
  )
}

export default SearchSection
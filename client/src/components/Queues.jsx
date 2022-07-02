import axios from 'axios'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getQueues } from '../redux/queue'
import EpisodeWithPodcastInfo from './EpisodeWithPodcastInfo'
import { convertEpisodeDataNaming } from '../helpers/helpers'

function Queues({ queues, handlePlay, handlePause }) {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user)

  useEffect(() => {
    if (userStatus.logged_in) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/queues`, { withCredentials: true })
        .then((response) => {
          if (response.data) dispatch(getQueues(response.data));
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [dispatch, userStatus.logged_in])

  return (
    <div>
      <div className='flex flex-wrap justify-center'>
        {queues.map(queue => {
          const episode = convertEpisodeDataNaming(queue)
          return (
            <div key={queue.track_id}>
              <EpisodeWithPodcastInfo episode={episode} handlePlay={handlePlay} handlePause={handlePause} />
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default Queues
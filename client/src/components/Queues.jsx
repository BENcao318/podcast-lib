import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQueues } from '../redux/queue'
import Queue from './Queue'

const serverURL = 'http://localhost:3000/api/v1'

function Queues({ queues, handlePlay, handlePause }) {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user)

  useEffect(() => {
    if (userStatus.logged_in) {
      axios.get(`${serverURL}/queues`, { withCredentials: true })
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
        {queues.map(queue => (
          <div key={queue.track_id}>
            <Queue queue={queue} handlePlay={handlePlay} handlePause={handlePause} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Queues
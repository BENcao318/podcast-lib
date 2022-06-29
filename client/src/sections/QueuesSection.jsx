import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Queues from '../components/Queues'
import { getQueues } from '../redux/queue'

const serverURL = 'http://localhost:3000/api/v1/queues'

function QueuesSection({ handlePlay, handlePause }) {
  const dispatch = useDispatch()
  const queues = useSelector((state) => state.queue.queues)

  useEffect(() => {
    axios.get(serverURL, { withCredentials: true })
      .then((response) => {
        if (response.data) dispatch(getQueues(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }, [dispatch])

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <div className='font-semibold text-2xl my-6 text-neutral-600'>
        Your Queues:
      </div>
      <Queues queues={queues} handlePlay={handlePlay} handlePause={handlePause} />
      <div className='h-36'></div>
    </section>
  )
}

export default QueuesSection
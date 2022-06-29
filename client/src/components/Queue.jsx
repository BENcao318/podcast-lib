import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { convertDateFormat, convertMillisecToHrMin } from '../helpers/helpers';
import { addQueue, removeQueue } from '../redux/queue';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import { ReactComponent as ToAddQueue } from '../assets/to-add-queues.svg'
import { ReactComponent as Queued } from '../assets/queue-checked.svg'
import { useNavigate } from 'react-router-dom';

const serverURL = 'http://localhost:3000/api/v1'

function Queue({ queue, handlePlay, handlePause }) {
  const episode = {
    episodeUrl: queue.episode_url,
    artworkUrl160: queue.artwork_url_600,
    trackName: queue.episode_name
  }
  const [isReadMore, setIsReadMore] = useState(false);

  const episodePlayer = useSelector((state) => state.episodePlayer)
  const queuesStatus = useSelector((state) => state.queue.queues)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const toggleReadMore = useCallback(() => {
    setIsReadMore(prevIsReadMore => !prevIsReadMore);
  }, [])

  const handleQueue = useCallback(() => {
    const episode_to_queue = queue
    axios.post(`${serverURL}/queue`, { episode_to_queue }, { withCredentials: true })
      .then((response) => {
        dispatch(addQueue(queue))
      })
  }, [queue, dispatch])

  const handleUnQueue = useCallback(() => {
    const episode_to_unqueue = {
      track_id: queue.track_id,
      episode_name: queue.episode_name
    }
    axios.post(`${serverURL}/unqueue`, { episode_to_unqueue }, { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          dispatch(removeQueue(queue.track_id))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [queue.track_id, queue.episode_name, dispatch])



  return (
    <div className='flex'>
      <div className='cursor-pointer' >
        <img src={queue.artwork_url_600} alt="cover images" className='w-36 rounded-lg mr-6' onClick={() => navigate(`/podcasts/${queue.collection_id}`)} />
      </div>
      <div className='mb-4 max-w-2xl text-left'>
        <p className='font-medium text-zinc-600 text-xs'>{convertDateFormat(queue.release_date)}</p>
        <p className='text-black font-semibold text-xl'>{queue.episode_name}</p>
        <div className='text-gray-600 mb-2'>
          {isReadMore ?
            <span>{queue.description}</span> :
            <span>{`${queue.description.slice(0, 123)} ...`}</span>
          }
          <span className='font-medium text-zinc-600 cursor-pointer' onClick={toggleReadMore}>
            {isReadMore ?
              <span className='ml-4 text-end hover:text-sky-600 underline hover:decoration-sky-600 hover:opacity-80'>Read Less</span> :
              <span className='ml-4 text-end hover:text-sky-600 underline hover:decoration-indigo-600 hover:opacity-80'>Read More</span>
            }
          </span>
        </div>
        <div className='grid grid-cols-2 items-center'>
          <div className='grid grid-cols-2 items-center w-60'>
            {episodePlayer.isPlaying && episodePlayer.episode.episodeUrl === queue.episode_url ?
              <PauseButton handlePause={handlePause} />
              :
              <PlayButton handlePlay={handlePlay} episode={episode} />
            }
            <span className='text-sm font-medium text-neutral-600 ml-6'>{convertMillisecToHrMin(queue.track_time_millis)}</span>
          </div>
          {
            queuesStatus.some((queueStatus) => queueStatus.track_id === queue.track_id) ?
              <div className='group p-1 mr-2 cursor-pointer rounded-lg justify-self-end hover:animate-wiggle ' onClick={handleUnQueue}>
                <Queued className='w-8 h-8 fill-sky-600 group-hover:fill-violet-600 inline-block ' />
              </div>
              :
              <div className='p-1 mr-2 hover:border-sky-600 cursor-pointer justify-self-end hover:animate-bounce' onClick={handleQueue}>
                <ToAddQueue className='w-8 h-8 fill-neutral-800 hover:fill-sky-600 inline-block' />
              </div>
          }
        </div>
        {/* {warning &&
          <div className='bg-sky-600 font-base rounded-xl text-neutral-200 text-lg py-2 px-2 place-self-end text-center'>
            Please log in before adding queues
          </div>
        } */}
        <hr className='mt-3 border-b-1 border-gray-600'></hr>
      </div>
    </div>
  )
}

export default Queue
import React, { useRef } from 'react'

import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { convertDateFormat, convertMillisecToHrMin } from '../helpers/helpers'
import PauseButton from './PauseButton'
import PlayButton from './PlayButton'
import { ReactComponent as ToAddQueue } from '../assets/to-add-queues.svg'
import { addQueue, removeQueue, getQueues } from '../redux/queue'
import { ReactComponent as Queued } from '../assets/queue-checked.svg'


function Episode({ episode, handlePlay, handlePause }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const [warning, setWarning] = useState(false)

  const timeoutRef = useRef()

  const episodePlayer = useSelector((state) => state.episodePlayer);
  const queues = useSelector((state) => state.queue.queues)
  const dispatch = useDispatch()
  const userStatus = useSelector((state) => state.user)

  const toggleReadMore = useCallback(() => {
    setIsReadMore(prevIsReadMore => !prevIsReadMore);
  }, [])

  const handleQueue = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (userStatus.logged_in) {
      // const podcast_to_subscribe = {
      //   name: podcastDetails.collectionName,
      //   description: podcastDetails.description,
      //   artist_name: podcastDetails.artistName,
      //   art_work_url_600: podcastDetails.artworkUrl600,
      //   genre_ids: podcastDetails.genreIds,
      //   genres: podcastDetails.genres,
      //   track_id: podcastDetails.trackId
      // }
      dispatch(addQueue(episode))
      // axios.post(`${serverURL}/subscribe`, { podcast_to_subscribe }, { withCredentials: true })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
    } else {
      setWarning(true)
      timeoutRef.current = setTimeout(() => {
        setWarning(false)
      }, 2000)
    }
  }, [dispatch, episode, userStatus.logged_in])

  const handleUnQueue = useCallback(() => {
    console.log('unqueue')
    // const podcast_to_unsubscribe = podcastDetails.collectionName
    dispatch(removeQueue(episode.trackId))
    // axios.post(`${serverURL}/unsubscribe`, { podcast_to_unsubscribe }, { withCredentials: true })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
  }, [dispatch, episode])

  return (
    <div className='mb-4 max-w-2xl text-left'>
      <p className='font-medium text-zinc-600 text-xs'>{convertDateFormat(episode.releaseDate)}</p>
      <p className='text-black font-semibold text-xl'>{episode.trackName}</p>
      <div className='text-gray-600 mb-2'>
        {isReadMore ?
          <span>{episode.description}</span> :
          <span>{`${episode.description.slice(0, 123)} ...`}</span>
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
          {episodePlayer.isPlaying && episodePlayer.episode.episodeUrl === episode.episodeUrl ?
            <PauseButton handlePause={handlePause} />
            :
            <PlayButton handlePlay={handlePlay} episode={episode} />
          }
          <span className='text-sm font-medium text-neutral-600'>{convertMillisecToHrMin(episode.trackTimeMillis)}</span>
        </div>
        {
          queues.some((queue) => queue.trackId === episode.trackId) ?
            <div className='group p-1 mr-2 cursor-pointer rounded-lg justify-self-end hover:animate-wiggle ' onClick={handleUnQueue}>
              <Queued className='w-8 h-8 fill-sky-600 group-hover:fill-violet-600 inline-block ' />
            </div>
            :
            <div className='p-1 mr-2 hover:border-sky-600 cursor-pointer justify-self-end hover:animate-bounce' onClick={handleQueue}>
              <ToAddQueue className='w-8 h-8 fill-neutral-800 hover:fill-sky-600 inline-block' />
            </div>
        }
      </div>
      {warning &&
        <div className='bg-sky-600 font-base rounded-xl text-neutral-200 text-lg py-2 px-2 place-self-end text-center'>
          Please log in before adding queues
        </div>
      }
      <hr className='mt-3 border-b-1 border-gray-600'></hr>
    </div>
  )
}

export default Episode
import React, { useRef } from 'react'

import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';

import { convertDateFormat, convertMillisecToHrMin } from '../helpers/helpers'
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';


function Episode({ episode, handlePlay, handlePause }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const episodePlayer = useSelector((state) => state.episodePlayer);

  const toggleReadMore = useCallback(() => {
    setIsReadMore(prevIsReadMore => !prevIsReadMore);
  }, [])

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
      <div className='flex items-center'>
        {episodePlayer.isPlaying && episodePlayer.episode.episodeUrl == episode.episodeUrl ?
          <PauseButton handlePause={handlePause} />
          :
          <PlayButton handlePlay={handlePlay} episode={episode} />
        }
        <span className='ml-4 text-sm font-medium text-neutral-600'>{convertMillisecToHrMin(episode.trackTimeMillis)}</span>
      </div>
      <hr className='mt-3 border-b-1 border-gray-600'></hr>
    </div>
  )
}

export default Episode
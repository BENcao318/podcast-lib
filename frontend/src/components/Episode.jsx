import React, { useRef } from 'react'

import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';

import playButton from '../assets/play.svg';
import pauseButton from '../assets/pause.svg'


function Episode({ episode, handlePlay, handlePause }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const episodePlayer = useSelector((state) => state.episodePlayer);

  const toggleReadMore = useCallback(() => {
    setIsReadMore(prevIsReadMore => !prevIsReadMore);
  }, [])

  return (
    <div className='mb-6 max-w-2xl text-left'>
      <p>{episode.releaseDate}</p>
      <p className='text-black font-bold text-lg'>{episode.trackName}</p>
      {isReadMore ? <span>{episode.description}</span> : <span>{`${episode.description.slice(0, 123)} ...`}</span>}
      <span className='font-medium underline text-black cursor-pointer' onClick={toggleReadMore}>
        {isReadMore ? <span className='text-right block'>Read Less</span> : <span className='ml-4'>Read More</span>}
      </span>
      <span>Duration</span>
      <br />
      {episodePlayer.isPlaying && episodePlayer.episode.episodeUrl == episode.episodeUrl ?
        <img src={pauseButton} alt="pausebutton" className='w-6' onClick={handlePause} />
        :
        <img src={playButton} alt="playbutton" className="w-6" onClick={() => handlePlay(episode)} />
      }
      <hr className='mt-6 border-b-1 border-gray-600'></hr>
    </div>
  )
}

export default Episode
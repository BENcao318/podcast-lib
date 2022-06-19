import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import playButton from '../assets/play.svg';
import pauseButton from '../assets/pause.svg'
import { episodePlaying, episodePause } from '../redux/episodePlayer'


function AudioPlayer({ handlePause, handlePlay }) {
  const episodePlayer = useSelector((state) => state.episodePlayer)


  return (
    <section className='fixed left-0 bottom-0 min-w-full z-20 h-32 bg-green-600 flex items-center justify-center'>
      <div className=''>
        {episodePlayer.isPlaying ?
          <img src={pauseButton} alt="pausebutton" className='w-12' onClick={handlePause} />
          :
          <img src={playButton} alt="playbutton" className="w-12" onClick={() => handlePlay(episodePlayer.episode)} />
        }
      </div>
    </section>
  )
}

export default AudioPlayer
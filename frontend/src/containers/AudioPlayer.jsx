import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { episodePlaying, episodePause } from '../redux/episodePlayer'
import { convertSecToHrMinSec } from '../helpers/helpers'

import { ReactComponent as FastforwardButton } from '../assets/fastForwardButton30.svg'
import { ReactComponent as BackwardsButton } from '../assets/backwardsButton15.svg'
import { ReactComponent as PlayButton } from '../assets/play-button.svg'
import { ReactComponent as PauseButton } from '../assets/pause-button.svg'
import { ReactComponent as SoundImg } from '../assets/sound.svg'


function AudioPlayer({ handlePause, handlePlay, audioRef, audioProgress, fastforward, backward }) {
  const episodePlayer = useSelector((state) => state.episodePlayer)

  const [forwardEffect, setForwardEffect] = useState(false)
  const [backwardEffect, setBackwardEffect] = useState(false)
  const [volume, setVolume] = useState(60)

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  return (
    <section className='fixed left-0 bottom-0 min-w-full z-20 h-28 bg-neutral-100 grid grid-cols-3 place-items-center shadow-inner shadow-sky-200'>
      <div className='flex justify-self-start'>
        <img src={episodePlayer.episode.artworkUrl160} alt="podcast cover" className='w-24 rounded-lg ml-4' />
        <div className='ml-4 my-auto max-h-24'>
          <p className='text-gray-600'>Playing Episode:</p>
          <p className='font-semibold text-lg'>{episodePlayer.episode.trackName}</p>
        </div>
      </div>
      <div className='justify-self-center'>
        <div className='flex gap-4' >
          <BackwardsButton
            className={`${backwardEffect && 'animate-wigglefast'} w-8 fill-green-600 rounded-full hover:fill-lime-600`}
            onClick={() => {
              backward()
              setBackwardEffect(true)
              setTimeout(() => {
                setBackwardEffect(false)
              }, 200)
            }}
          />
          <div className='w-16 flex place-content-center'>
            {episodePlayer.isPlaying ?
              <PauseButton
                className='w-12 fill-green-600 rounded-full hover:fill-lime-600'
                onClick={handlePause}
              />
              :
              <PlayButton className='w-12 fill-green-600 rounded-full hover:fill-lime-600' onClick={() => handlePlay(episodePlayer.episode)} />
            }
          </div>
          <FastforwardButton
            className={`${forwardEffect && 'animate-wigglefast'} w-8 fill-green-600 rounded-full hover:fill-lime-600`}
            onClick={() => {
              fastforward()
              setForwardEffect(true)
              setTimeout(() => {
                setForwardEffect(false)
              }, 200)
            }}
          />
        </div>
        {audioRef.current &&
          <div className='text-center mt-2'>
            {convertSecToHrMinSec(audioProgress)} / {convertSecToHrMinSec(audioRef.current.duration)}
          </div>
        }
      </div>
      <div className='text-center justify-self-end mr-12 flex items-center gap-2'>
        <SoundImg className='w-6' />
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          class="w-28 h-1 accent-green-800 cursor-pointer"
          onChange={event => {
            setVolume(event.target.valueAsNumber)
          }}
        />
        <p className='w-2'>{Math.floor(volume * 100).toString()}%</p>
      </div>
    </section >
  )
}

export default AudioPlayer
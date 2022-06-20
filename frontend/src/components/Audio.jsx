import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { episodeAudioDuration, episodeIsLoading, episodeIsPlaying, setAudioRef } from '../redux/episodePlayer';

function Audio() {
  const dispatch = useDispatch()
  const { episode, isPlaying } = useSelector(state => state.episodePlayer)
  const audioRef = useRef()
  console.log('Audio!!!!!!!!!!!!!!');

  useEffect(() => {
    if (episode) {
      dispatch(episodeIsLoading())
    }
  }, [episode])

  // useEffect(() => {
  //   if (isPlaying) {
  //     useRef.current.play()
  //   } else {
  //     useRef.current.pause()
  //   }
  // }, [isPlaying])

  return (
    <audio
      ref={audioRef}
      onLoadedMetadata={() => {
        dispatch(episodeAudioDuration(audioRef.current.duration))
        dispatch(episodeIsPlaying(episode))
        dispatch(setAudioRef(audioRef))
      }}
    >
      <source src={episode.episode_url} type="audio/x-wav" />
    </audio>
  )
}

export default Audio
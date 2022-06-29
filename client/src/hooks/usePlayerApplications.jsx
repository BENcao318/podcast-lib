// move handlePlay(), handlePause(), fastForward(), backForward(), startInterval() and audioProgress to here
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { episodePlaying, episodePause, episodeLoading, setPlayingEpisode } from '../redux/episodePlayer'

function usePlayerApplications() {
  const [audioProgress, setAudioProgress] = useState('123')

  const audioRef = useRef()
  const intervalRef = useRef()
  const dispatch = useDispatch()
  const episodePlayer = useSelector((state) => state.episodePlayer)

  const startInterval = () => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setAudioProgress(audioRef.current.currentTime)
    }, [1000])
  }

  const fastforward = () => {
    const fastforwardTime = 30
    clearInterval(intervalRef.current)

    if (audioRef.current.currentTime + fastforwardTime < audioRef.current.duration) {
      audioRef.current.currentTime += fastforwardTime
    }

    setAudioProgress(audioRef.current.currentTime)
    startInterval()
  }

  const backward = () => {
    const backwardTime = 15

    clearInterval(intervalRef.current)

    audioRef.current.currentTime -= backwardTime
    setAudioProgress(audioRef.current.currentTime)
    startInterval()
  }

  const handlePlay = (episode) => {
    console.log('playing!')
    if (!episodePlayer.episode.episodeUrl) {
      dispatch(episodeLoading())
      audioRef.current = new Audio(episode.episodeUrl)
      audioRef.current.play()
      dispatch(setPlayingEpisode(episode))
      dispatch(episodePlaying())
      // setDuration(audioRef.current.duration)
      startInterval()
    } else if (episodePlayer.episode.episodeUrl !== episode.episodeUrl) {
      audioRef.current.pause()    //pause current playing audio and create a new audio instance
      audioRef.current = new Audio(episode.episodeUrl)
      audioRef.current.play()
      dispatch(episodePlaying())
      dispatch(setPlayingEpisode(episode))
      // setDuration(audioRef.current.duration)

      setAudioProgress(0)
      startInterval()
    } else {
      audioRef.current.play()
      dispatch(episodePlaying(episode))
      dispatch(setPlayingEpisode(episode))
      // setDuration(audioRef.current.duration)
      startInterval()
    }
  }

  const handlePause = () => {
    audioRef.current.pause()
    dispatch(episodePause())
  }

  useEffect(() => {
    audioRef.current && dispatch(episodePlaying())
  }, [dispatch])

  return {
    audioProgress,
    audioRef,
    fastforward,
    backward,
    handlePlay,
    handlePause
  }
}

export default usePlayerApplications
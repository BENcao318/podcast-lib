import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { episodePlaying, episodePause, episodeLoading, setPlayingEpisode } from './redux/episodePlayer'
import { userLogin, userLogout } from './redux/user'
import './App.css';

import SideBar from './containers/SideBar';
import Main from './containers/Main';
import AudioPlayer from './containers/AudioPlayer';
import axios from 'axios';

const serverAPIUrl = 'http://localhost:3000/api/v1'

function App() {
  // const [duration, setDuration] = useState()
  const [audioProgress, setAudioProgress] = useState()

  const audioRef = useRef()
  const intervalRef = useRef()
  const dispatch = useDispatch()
  const episodePlayer = useSelector((state) => state.episodePlayer)

  function startInterval() {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setAudioProgress(audioRef.current.currentTime)
    }, [1000])
  }

  function fastforward() {
    const fastforwardTime = 10
    clearInterval(intervalRef.current)

    if (audioRef.current.currentTime + fastforwardTime < audioRef.current.duration) {
      audioRef.current.currentTime += fastforwardTime
    }

    setAudioProgress(audioRef.current.currentTime)
  }

  function backward() {
    const backwardTime = 10

    clearInterval(intervalRef.current)

    audioRef.current.currentTime -= backwardTime
    setAudioProgress(audioRef.current.currentTime)
  }

  function handlePlay(episode) {
    if (!episodePlayer.episode.episodeUrl) {
      dispatch(episodeLoading())
      audioRef.current = new Audio(episode.episodeUrl)
      audioRef.current.play()
      dispatch(setPlayingEpisode(episode))
      // dispatch(episodePlaying())
      // setDuration(audioRef.current.duration)
      startInterval()
    } else if (episodePlayer.episode.episodeUrl !== episode.episodeUrl) {
      audioRef.current.pause()    //pause current playing audio and create a new audio instance
      audioRef.current = new Audio(episode.episodeUrl)
      audioRef.current.play()
      console.log('playing')
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

  function handlePause() {
    audioRef.current.pause()
    dispatch(episodePause())
  }

  function userLoginStatus() {
    axios.get('http://localhost:3000/api/v1/logged_in')  //{ withCredentials: true }
      .then((response) => {
        if (response.data.logged_in) {
          dispatch(userLogin())
        } else {
          dispatch(userLogout())
        }
      })
      .catch((error) => console.log('error:', error))
  }

  useEffect(() => {
    audioRef.current && dispatch(episodePlaying())
  }, [audioRef.current])

  useEffect(() => {
    userLoginStatus()
  }, [])

  return (
    <div className="flex">
      <BrowserRouter>
        <SideBar />
        <Main handlePause={handlePause} handlePlay={handlePlay} />
        <AudioPlayer handlePause={handlePause} handlePlay={handlePlay} audioRef={audioRef} audioProgress={audioProgress} fastforward={fastforward} backward={backward} />
      </BrowserRouter>
    </div>
  );
}

export default App;

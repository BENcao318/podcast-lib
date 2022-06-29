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
import SearchBar from './containers/SearchBar';
import { useCallback } from 'react';
import usePlayerApplications from './hooks/usePlayerApplications';

const serverURL = 'http://localhost:3000/api/v1'

function App() {
  const { audioProgress, audioRef, fastforward, backward, handlePlay, handlePause } = usePlayerApplications()
  const episodePlayer = useSelector((state) => state.episodePlayer)
  const dispatch = useDispatch()

  const userLoginStatus = useCallback(() => {
    axios.get(`${serverURL}/logged_in`, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          dispatch(userLogin(response.data.user))
        } else {
          dispatch(userLogout())
        }
      })
      .catch((error) => console.log('error:', error))
  }, [dispatch])

  useEffect(() => {
    userLoginStatus()
  }, [userLoginStatus])

  return (
    <>
      <BrowserRouter>
        <SideBar />
        <div className='grid justify-items-center'>
          <Main handlePause={handlePause} handlePlay={handlePlay} />
          {
            Object.keys(episodePlayer.episode).length !== 0
            &&
            <AudioPlayer handlePause={handlePause} handlePlay={handlePlay} audioRef={audioRef} audioProgress={audioProgress} fastforward={fastforward} backward={backward} />
          }
          <SearchBar />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

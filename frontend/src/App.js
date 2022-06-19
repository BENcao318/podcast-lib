import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { episodePlaying, episodePause } from './redux/episodePlayer'
import './App.css';

import SideBar from './containers/SideBar';
import Main from './containers/Main';
import AudioPlayer from './containers/AudioPlayer';

function App() {
  const [audio, setAudio] = useState({})
  const dispatch = useDispatch()
  const episodePlayer = useSelector((state) => state.episodePlayer)

  function handlePlay(episode) {
    let currentTrack
    if (!episodePlayer.episode.episodeUrl) {
      currentTrack = new Audio(episode.episodeUrl)
      currentTrack.play()
      setAudio(currentTrack)
      dispatch(episodePlaying(episode))
    } else if (episodePlayer.episode.episodeUrl !== episode.episodeUrl) {
      currentTrack = new Audio(episode.episodeUrl)
      currentTrack.play()
      setAudio(currentTrack)
      dispatch(episodePlaying(episode))
    } else {
      audio.play()
      dispatch(episodePlaying(episode))
    }

  }

  function handlePause() {
    audio.pause()
    dispatch(episodePause())
  }

  return (
    <div className="flex">
      <BrowserRouter>
        <SideBar />
        <Main handlePause={handlePause} handlePlay={handlePlay} />
        <AudioPlayer handlePause={handlePause} handlePlay={handlePlay} />
      </BrowserRouter>
    </div>
  );
}

export default App;

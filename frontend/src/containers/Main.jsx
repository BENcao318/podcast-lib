import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import HomeSection from '../sections/HomeSection';
import LoginSection from '../sections/LoginSection';
import PodcastSection from '../sections/PodcastSection';
import SearchSection from '../sections/SearchSection';
import SignupSection from '../sections/SignupSection';
import SubscriptionSection from '../sections/SubscriptionSection';
import Test from './Test';

function Main({ handlePause, handlePlay }) {
  const userStatus = useSelector((state) => state.user)

  return (
    <main className='lg:w-5/6 text-center'>
      Main
      <Routes>
        <Route path='/' element={<HomeSection />}></Route>
        <Route path='/search' element={<SearchSection />}></Route>
        <Route path='/podcasts/:id' element={<PodcastSection handlePause={handlePause} handlePlay={handlePlay} />}></Route>
        {userStatus.logged_in ?
          <Route path='/subscriptions' element={<SubscriptionSection />}> </Route> :
          <Route path='/subscriptions' element={<LoginSection />}> </Route>
        }
        <Route path='/login' element={<LoginSection />}> </Route>
        <Route path='/signup' element={<SignupSection />}> </Route>
        <Route path='/test' element={<Test />}></Route>
      </Routes>
    </main>
  )
}

export default Main
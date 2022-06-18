import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeSection from '../sections/HomeSection';
import PodcastSection from '../sections/PodcastSection';
import SearchSection from '../sections/SearchSection';
import Test from './Test';

function Main() {
  return (
    <main className='lg:w-5/6 text-center'>
      Main
      <Routes>
        <Route path='/' element={<HomeSection />}></Route>
        <Route path='/search' element={<SearchSection />}></Route>
        <Route path='/podcasts/:id' element={<PodcastSection />}></Route>
        <Route path='/test' element={<Test />}></Route>
      </Routes>
    </main>
  )
}

export default Main
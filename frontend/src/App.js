import React from 'react';
import './App.css';
import SideBar from './containers/SideBar';
import Main from './containers/Main';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <BrowserRouter>
        <SideBar />
        <Main />

      </BrowserRouter>
    </div>
  );
}

export default App;

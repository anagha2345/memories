
import React from 'react';
import './App.css';

import Edit from './components/Edit';
import Dele from './components/Dele';
import Home from './components/Home';
import { Route,Routes } from 'react-router-dom';
import Pagenotfound from './components/Pagenotfound';
import View from './components/View';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<Home/>}></Route>
        <Route path='view/:id' element={<View/>}></Route>
        <Route path='edit/:id' element={<Edit/>}></Route>
        <Route path='delete/:id' element={<Dele/>}></Route>
        <Route path='*' element={<Pagenotfound/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;

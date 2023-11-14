import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-gradient-to-r from-cyan-500 to-blue-500 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain bg-[#9ce9fc] p-2 rounded-md" />
        </Link>

        <Link to="/create-post" className="font-inter font-medium bg-gradient-to-r from-green-300 to-green-500 text-dark px-2 py-2 rounded-md">
          Generate your own image
        </Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#35478d] min-h-[calc(100vh-73px)]">

        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App;
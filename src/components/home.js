import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./navBar";
import './home.css';
import Library from './library';
import Playlist from './playlist';
import Favourites from './favourites';
import Songs from './songslist';


const Home = () => {
 
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
        <NavBar/>
      <div className="main-container">
        <Routes>
        <Route
                    path="/"
                    element={<Songs/>}
                />
        <Route
                    path="/library"
                    element={<Library setSelectedPlaylist={setSelectedPlaylist} />}
                />
                <Route
                    path="/playlist/:name"
                    element={<Playlist playlist={selectedPlaylist} />}
                />
          <Route path="/favourites" element={<Favourites/>} ></Route>
        </Routes>
            <NavBar setSearchQuery={setSearchQuery} />  
            <Songs searchQuery={searchQuery} />
      </div>
    </Router>
  );
};

export default Home;

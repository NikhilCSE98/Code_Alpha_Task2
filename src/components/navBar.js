import React, { useState } from "react";
import './navBar.css';
import NavbarButton from "./navbarButtons";
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";

const NavBar = ({ setSearchQuery }) => {
    const [query, setQuery] = useState(""); 

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(query); 
    };

    return (
        <nav className="navbar-body">
            <div className="nav-box1">
                <h3 className="navbar-brand">VibeStream</h3>
                <div className="navbtn">
                    <NavbarButton title="Home" to="/" icon={<FaHome />} />
                    <NavbarButton title="PlayList" to="/library" icon={<IoLibrary />} />
                    <NavbarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
                </div>
                <form className="search-bar" onSubmit={handleSearch} role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                    <button className="search-btn" type="submit">
                        Search
                    </button>
                </form>
                <p className="profile-icon"><span className="user-icon"><FaRegUserCircle /></span></p>
            </div>
        </nav>
    );
}

export default NavBar;

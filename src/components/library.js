import React, { useState, useEffect } from "react";
import './library.css';
import { useNavigate } from "react-router-dom";


const Library = ({ setSelectedPlaylist }) => {
    const [playlists, setPlaylists] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const getPlaylists = async () => {
            const queries = ['rock', 'pop', 'hiphop'];
            let allPlaylists = [];

            try {
               
                for (let query of queries) {
                    let response = await fetch(`https://v1.nocodeapi.com/nikhil_verma98/spotify/YNtUvvUnAbRhQJDc/search?q=${query}&type=playlist`);
                    let data = await response.json();
                    if (data.playlists && data.playlists.items) {
                        console.log(data.playlists.items);
                        allPlaylists = [...allPlaylists, ...data.playlists.items]; 
                    }
                }

                setPlaylists(allPlaylists); 
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        getPlaylists();
    }, []);


    const handlePlaylistClick = (playlist) => {
        setSelectedPlaylist(playlist);
        navigate(`/playlist/${playlist.name}`);
    };


    const truncateName = (name, length) => {
        return name.length > length ? name.substring(0, length) + '...' : name;
    };

    return (
        <>
            <div className="Albums">
                {
                    playlists.map((element) => {
                        return (
                            <div key={element.id} className="card-container" onClick={() => handlePlaylistClick(element)}>
                                <div className="img-card">
                                    <img src={element.images[0].url} className="card-img" alt={element.name} />
                                </div>
                                <div className="card-body">
                                    <p className="card-title">{truncateName(element.name, 15)}</p>
                                    <p className="card-owner">Owner: {element.owner.display_name}</p>
                                    <p className="card-tracks">Tracks: {element.tracks.total}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default Library;

import React, { useState, useEffect } from "react";
import './library.css';

const Songs = ({ searchQuery }) => {
    const [tracks, setTracks] = useState([]); 

    useEffect(() => {
        const getTracks = async () => {
            try {
                 let query = searchQuery === "" ? "daku" : searchQuery;
                let response = await fetch(`https://v1.nocodeapi.com/nikhil_verma98/spotify/YNtUvvUnAbRhQJDc/search?q=${query}&type=track`);
                let data = await response.json();

                if (data.tracks && data.tracks.items) {
                    console.log(data.tracks.items);  
                    setTracks(data.tracks.items);  
                }
            } catch (error) {
                console.error("Error fetching tracks:", error);
            }
        };

            getTracks();  // Fetch songs only if a search query exists
        
    }, [searchQuery]);  // Re-run the effect when the search query changes

    const truncateName = (name, length) => {
        return name.length > length ? name.substring(0, length) + '...' : name;
    };

    return (
        <>
            <div className="Albums">
                {
                    tracks.map((element) => {
                        return (
                            <div key={element.id} className="card-container">
                                <div className="img-card">
                                    <img src={element.album.images[0].url} className="card-img" alt={element.name} />
                                </div>
                                <div className="card-body">
                                    <p className="card-title">{truncateName(element.name, 15)}</p>
                                    <p className="card-owner">Artist: {element.album.artists[0].name}</p>
                                    <audio src={element.preview_url} controls className="audio-player"></audio>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default Songs;

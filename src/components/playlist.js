import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './playlist.css';

const Playlist = ({ playlist }) => {
    const navigate = useNavigate();
    const [tracks, setTracks] = useState([]); 

    useEffect(() => {
        if (!playlist) {
            navigate('/library');
        } else {
            console.log("Selected Playlist Data:", playlist); 
            fetchTracksForPlaylist(playlist.id);
        }
    }, [playlist, navigate]);

    const fetchTracksForPlaylist = async (playlistId) => {
        try {
            const response = await fetch(`https://v1.nocodeapi.com/nikhil_verma98/spotify/YNtUvvUnAbRhQJDc/search?q=${playlistId}&type=track`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error("Received non-JSON response");
            }

            const data = await response.json();
            console.log("Fetched playlist data:", data);

            if (data.tracks && data.tracks.items) {
                const trackList = []; 

                data.tracks.items.forEach(item => {
                    if (item && item.track && item.track.album && item.track.album.images && item.track.artists) {
                        const trackDetails = {
                            id: item.track.id,
                            name: item.track.name,
                            artist: item.track.artists[0]?.name || 'Unknown Artist', 
                            albumImage: item.track.album.images[0]?.url || 'default_image_url' // Use a default image if missing
                        };
                        trackList.push(trackDetails); 
                    }
                
                });
                
                setTracks(trackList); 
            }
        } catch (error) {
            console.error("Error fetching tracks for playlist:", error);
        }
    };

    if (!playlist) {
        return null; 
    }

    return (
        <div className="playlist-detail">
            
            <div className="playlist-header">
                <img src={playlist.images[0]?.url} className="playlist-image" alt={playlist.name} />
                <div className="playlist-info">
                    <h1>{playlist.name}</h1>
                    <p>Owner: {playlist.owner?.display_name}</p>
                    <p>Tracks: {playlist.tracks?.total}</p>
                </div>
            </div>

            <div className="track-tile-container">
                { 
                    tracks.map((track) => (
                        <div key={track.id} className="track-tile">
                            <img
                                src={track.albumImage}
                                className="track-image"
                                alt={track.name}
                            />
                            <div className="track-info">
                                <p className="track-name">{track.name}</p>
                                <p className="track-artist">{track.artist}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Playlist;

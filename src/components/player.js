import React, { useRef, useEffect } from "react";
import './player.css';

const Player = ({ currentTrack, isPlaying, setIsPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (currentTrack && currentTrack.preview_url) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    const togglePlayPause = () => {
        if (currentTrack && currentTrack.preview_url) {
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="player-container">
            {currentTrack ? (
                currentTrack.preview_url ? (
                    <>
                        <p>{currentTrack.name} - {currentTrack.artists[0].name}</p>
                        <audio ref={audioRef} src={currentTrack.preview_url} />

                        <button onClick={togglePlayPause}>
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                    </>
                ) : (
                    <p>Track preview not available</p>
                )
            ) : (
                <p>No track selected</p>
            )}
        </div>
    );
};

export default Player;

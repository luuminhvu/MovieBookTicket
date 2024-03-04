import React, { useRef } from "react";
import ReactPlayer from "react-player";
import Close from "../icons/Close";

const Player = ({ movie, handleClose }) => {
  const playerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (!playerRef.current.contains(event.target)) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleClickOutside}
    >
      <div
        ref={playerRef}
        className="relative w-full h-full max-w-screen-xl mx-auto sm:w-3/4 sm:h-3/4"
      >
        <ReactPlayer
          url={movie}
          controls
          width="100%"
          height="100%"
          light={true}
          playing={true}
          className="absolute top-0 left-0"
        />
      </div>
      <div className="absolute top-2 right-2 cursor-pointer">
        <Close onClick={handleClose} />
      </div>
    </div>
  );
};

export default Player;

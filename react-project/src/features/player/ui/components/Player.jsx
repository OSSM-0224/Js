import React from "react";
import { useSelector } from "react-redux";
import { usePlayer } from "../../hooks/usePlayer";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Player = () => {
  const { togglePlayAndPause, next, prev } = usePlayer();
  const { isPlaying } = useSelector((state) => state.player);

  return (
    <div className="flex justify-center items-center gap-6 h-[10%]">

      <button
        onClick={prev}
        className="bg-gray-700 text-white p-4 rounded-full"
      >
        <FaBackward />
      </button>

      <button
        onClick={togglePlayAndPause}
        className="bg-green-500 text-white p-6 rounded-full"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <button
        onClick={next}
        className="bg-gray-700 text-white p-4 rounded-full"
      >
        <FaForward />
      </button>

    </div>
  );
};

export default Player;
import React from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { playNewSong } from "../../../player/state/playerSlice";

const SongCard = ({ song }) => {
  let { dispatch } = useDashboard();

  return (
    <div className="bg-[#181818] p-4 rounded-xl hover:bg-[#282828] transition cursor-pointer w-64">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={song.thumbnail}
          alt={song.title}
          className="w-full h-48 object-cover rounded-lg"
        />

        {/* Play Button */}
        <button
          onClick={() => dispatch(playNewSong(song))}
          className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-lg transition"
        >
          ▶
        </button>
      </div>

      {/* Song Info */}
      <div className="mt-4">
        <h3 className="text-white font-semibold text-lg truncate">
          {song.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 truncate">{song.artist}</p>
        <p className="text-gray-500 text-xs mt-1 truncate">
          {song.album} • {song.year}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
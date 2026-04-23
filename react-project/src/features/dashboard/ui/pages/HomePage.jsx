import React from "react";
import { allSongs } from "../../api/songsApi";
import SongCard from "../components/SongCard";
import { axiosInstance } from "../../../../app/config/axiosInstance";

const HomePage = () => {
  let res = axiosInstance.get("https://fakestoreapi.com/productss");
  res.then((val) => console.log("from api->", val));

  let songs = allSongs();


  return (
    <div className="grid grid-cols-4 gap-4">
      {songs.map((elem) => {
        return <SongCard song={elem} />;
      })}
    </div>
  );
};

export default HomePage;
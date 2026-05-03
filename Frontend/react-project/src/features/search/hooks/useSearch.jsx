import { useState } from "react";
import { allSongs } from "../../dashboard/api/songsApi";

export let useSearch = () => {
  let songs = allSongs();
  const [searchValue, setSearchValue] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([]);

  let timer;

  let handleSearch = (e) => {
    let value = e.target.value;

    clearTimeout(timer);

    timer = setTimeout(() => {
      setSearchValue(value);

      let filteredSongs = songs.filter((elem) =>
        elem.title.toLowerCase().startsWith(value.toLowerCase())
      );

      console.log("running...");

      setSearchedSongs(filteredSongs);
    }, 500);
  };

  return {
    handleSearch,
    searchValue,
    searchedSongs,
  };
};
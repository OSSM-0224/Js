import { createSlice } from "@reduxjs/toolkit";

let playerSlice = createSlice({
  name: "player",
  initialState: {
    queue: [],
    currentPlayingSong: null,
    isPlaying: false,
  },
  reducers: {
    playNewSong: (state, action) => {
      state.currentPlayingSong = action.payload;
      state.isPlaying = true;
    },
    play: (state) => {
      state.isPlaying = true;
    },
    pause: (state) => {
      state.isPlaying = false;
    },
    nextSong: () => {},
    prevSong: () => {},
  },
});

export let { playNewSong, play, pause } = playerSlice.actions;
export default playerSlice.reducer;
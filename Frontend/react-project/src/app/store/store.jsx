import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "../../features/player/state/playerSlice";
import errorReducer from "../../shared/state/errorSlice";

export let store = configureStore({
  reducer: {
    player: playerReducer,
    error: errorReducer,
  },
});

export let dispatch = store.dispatch;
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pause, play,nextSong, prevSong } from "../state/playerSlice";

export let usePlayer = () => {
  let dispatch = useDispatch();
  let audioRef = useRef(new Audio());
  console.log(audioRef);

  let { currentPlayingSong, isPlaying } = useSelector((store) => store.player);

  //   run everytime when redux state get updated
  useEffect(() => {
    if (!currentPlayingSong) return;

    audioRef.current.src = currentPlayingSong.url;
    audioRef.current.play();
  }, [currentPlayingSong]);

  // control of play and pause on the basis isPlaying event
  useEffect(() => {
    if (!currentPlayingSong) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    let audio = audioRef.current;

    let handleEnd = () => {
      dispatch(nextSong());
    };

    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("ended", handleEnd);
    };

  },[]);

  //   call actions play and pause
  let togglePlayAndPause = () => {
    console.log("is playing...", isPlaying);
    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };

  return {
    togglePlayAndPause,
    next: () => dispatch(nextSong()),
    prev: () => dispatch(prevSong()),
  };
};
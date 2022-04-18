import React, { useRef, useState, useEffect } from "react";
import playIcon from "../../svgs/play-solid.svg";
import pauseIcon from "../../svgs/pause-solid.svg";
import "./style.css";

export default function SecondController(props) {
  const { currentSelected, currentPlaying } = props;
  const [isPlaying, setIsPlaying] = useState("no");
  const audioRef = useRef(new Audio(currentSelected.previewUrl));
  useEffect(() => {
    audioRef.current = new Audio(currentSelected.previewUrl);
    audioRef.current.onended = () => {
      setIsPlaying("no");
    };
  }, [currentSelected.previewUrl]);
  const play = () => {
    if (isPlaying === "no") {
      currentPlaying(currentSelected);
      audioRef.current.play();
      setIsPlaying("yes");
      audioRef.current.onended = () => {
        setIsPlaying("no");
      };
    } else {
      audioRef.current.pause();
      setIsPlaying("no");
      audioRef.current.onended = () => {
        setIsPlaying("no");
      };
    }
  };
  return (
    <div className="secondController">
      <p>{currentSelected.trackName}</p>
      <button onClick={play}>
        <img
          src={isPlaying === "no" ? playIcon : pauseIcon}
          alt=""
          width={"35px"}
        />
      </button>
    </div>
  );
}

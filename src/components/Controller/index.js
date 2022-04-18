import React, { useEffect, useState, useRef } from "react";
import previousIcon from "../../svgs/angles-left-solid.svg";
import playIcon from "../../svgs/play-solid.svg";
import pauseIcon from "../../svgs/pause-solid.svg";
import nextIcon from "../../svgs/angles-right-solid.svg";
import "./style.css";

export default function Controller(props) {
  const { media } = props;
  const [currentTrack, setCurrentTrack] = useState("");
  const [isPlaying, setIsPlaying] = useState("no");
  const audioRef = useRef(new Audio(media.previewUrl));
  useEffect(() => {
    setCurrentTrack(media.trackName);
    audioRef.current.pause();
    audioRef.current = new Audio(media.previewUrl);
    if (audioRef.current.attributes.length > 1) audioRef.current.play();
    setIsPlaying("yes");
    audioRef.current.onended = () => {
      setIsPlaying("no");
    };
    // eslint-disable-next-line
  }, [media.previewUrl]);
  const onPlay = () => {
    if (isPlaying === "no") {
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
    <div>
      {media === "none" ? null : (
        <div className="controller">
          <div className="controllerText">{currentTrack}</div>
          <div className="btnwrapper">
            <div>
              <button>
                <img src={previousIcon} alt="" width={"25px"} />
              </button>
            </div>
            <div>
              <button onClick={onPlay}>
                <img
                  src={isPlaying === "no" ? playIcon : pauseIcon}
                  alt=""
                  width={"35px"}
                />
              </button>
            </div>
            <div>
              <button>
                <img src={nextIcon} alt="" width={"25px"} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

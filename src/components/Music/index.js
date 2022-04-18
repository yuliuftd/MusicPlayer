import React, { useState, useEffect } from "react";
import Song from "../Song";
import Controller from "../Controller";
import { useMediaQuery } from "react-responsive";
import "./style.css";

export default function Music(props) {
  const { list, sendAlbumSongs, currentPlaying } = props;
  const [isPlaying, setIsPlaying] = useState("no");
  const [playedList, setPlayedList] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const [currentMedia, setCurrentMedia] = useState("none");

  const handlePlayer = (song, url, id) => {
    if (isMobile === true) {
      setCurrentMedia(song);
      setIsPlaying(url);
      setPlayedList([...playedList, url]);
    } else {
      let albumlist = list.results.filter((x) => x.collectionId === id);
      sendAlbumSongs([...albumlist], song, url, [...playedList, url]);
    }
  };
  useEffect(() => {
    setIsPlaying(currentMedia.previewUrl);
  }, [currentMedia.previewUrl]);
  useEffect(() => {
    setIsPlaying(currentPlaying.previewUrl);
    setPlayedList([...playedList, currentPlaying.previewUrl]);
    // eslint-disable-next-line
  }, [currentPlaying.previewUrl]);
  return (
    <div className="musciContainer">
      {list.results ? (
        list.results.map((x, index) => (
          <Song
            key={index}
            details={x}
            onClick={() => handlePlayer(x, x.previewUrl, x.collectionId)}
            isPlaying={isPlaying}
            playedList={playedList}
          />
        ))
      ) : (
        <p>Noting found</p>
      )}
      <Controller media={currentMedia} />
    </div>
  );
}

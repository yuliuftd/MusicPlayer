import React from "react";
import "./style.css";
import gif from "../../svgs/sound_200.gif";

export default function Song(props) {
  const { details, onClick, isPlaying, playedList } = props;
  return (
    <div className="songWrapper" onClick={onClick}>
      <div className="imageWrapper">
        <img src={details.artworkUrl100} alt={details.trackName} />
      </div>
      <div className="songDetail">
        <div className="songInfo">
          <p>
            <b>
              {playedList.indexOf(details.previewUrl) !== -1 ? "✓" : null}
              {details.trackName || "No Trackname Found"}
            </b>
          </p>
          <p>{details.artistName}</p>
          <p>{details.collectionCensoredName || "No Album Found"}</p>
        </div>
        <div
          style={{
            display: isPlaying === details.previewUrl ? "block" : "none",
          }}
        >
          <img src={gif} alt="" />
        </div>
      </div>
    </div>
  );
}

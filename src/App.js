import { useEffect, useState } from "react";
import "./App.css";
import Music from "./components/Music";
import Searchbar from "./components/Searchbar";
import Song from "./components/Song";
import { useMediaQuery } from "react-responsive";
import SecondController from "./components/SecondController";

function App() {
  const [list, setList] = useState([]);
  const [albumList, setAlbumlist] = useState([]);
  const [mobileInUse, setMobileInUse] = useState("no");
  const [currentSelected, setCurrentSelected] = useState("");
  const [currentPlaying, setCurrentPlaying] = useState("");
  const hanldSearchResult = (songs) => {
    setList(songs);
  };
  const passAlbum = (albumSongs, selectedSong, url, playedList) => {
    setAlbumlist(albumSongs);
    setCurrentSelected(selectedSong);
  };
  const passPlaying = (song) => {
    setCurrentPlaying(song);
  };
  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });
  useEffect(() => {
    if (isMobile === true) {
      setMobileInUse("yes");
    }
  }, [isMobile]);
  const leftClassOnShow = () => {
    if (mobileInUse === "yes") {
      return "fullWidth";
    } else {
      if (albumList.length === 0) {
        return "fullWidth";
      } else {
        return "leftSideWidth";
      }
    }
  };
  const rightClassOnShow = () => {
    if (mobileInUse === "yes") {
      return "albumlistMobile";
    } else {
      if (albumList.length === 0) {
        return "albumlistMobile";
      } else {
        return "albumlistDesktop";
      }
    }
  };
  return (
    <div className="App">
      <div className={leftClassOnShow()}>
        <Searchbar sendSongs={hanldSearchResult} />
        <Music
          list={list}
          sendAlbumSongs={passAlbum}
          currentPlaying={currentPlaying}
        />
      </div>
      <div className={rightClassOnShow()}>
        <div>
          <img src={albumList[0]?.artworkUrl100} alt="" width={"200px"} />
          <SecondController
            currentSelected={currentSelected}
            currentPlaying={passPlaying}
          />
        </div>
        {mobileInUse === "no" &&
          albumList.map((x, index) => (
            <Song
              key={"album" + index}
              details={x}
              onClick={() => {
                console.log("no playable");
              }}
              isPlaying={null}
              playedList={[]}
            />
          ))}
      </div>
    </div>
  );
}

export default App;

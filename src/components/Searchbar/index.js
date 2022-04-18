import React, { useState, useEffect } from "react";
import MusicAPI from "../../service/service";
import "./style.css";

export default function Searchbar(props) {
  const [term, setTerm] = useState("");
  const fetchSongs = async (term) => {
    let response = await MusicAPI.searchSongs(term);
    const { sendSongs } = props;
    sendSongs(response.data);
    setTerm("");
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (term !== "") {
      fetchSongs(term);
    }
  };

  const onChangeHandler = (e) => {
    setTerm(e.target.value);
  };
  useEffect(() => {
    fetchSongs("Michael Jackson");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="searchBar">
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <input
          type="text"
          placeholder="Search your favor artists"
          value={term}
          onChange={(e) => onChangeHandler(e)}
          onKeyDown={(event) => {
            if (event.key === 13) {
              onSubmitHandler();
            }
          }}
        />
      </form>
    </div>
  );
}

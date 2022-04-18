import axios from "axios";

const MusicAPI = {
  searchSongs: async (term) => {
    const convertedTerm = term.toLowerCase().trim().split(" ").join("+");
    const _url = `https://itunes.apple.com/search?term=${convertedTerm}`;
    try {
      const json = await axios.get(_url);
      return json;
    } catch (error) {
      console.log(error);
    }
  },
};

export default MusicAPI;

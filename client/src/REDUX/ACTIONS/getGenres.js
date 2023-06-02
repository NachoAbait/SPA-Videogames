import axios from "axios";

export function getGenres() {
  return async function (dispatch) {
    var genres = await axios.get("http://localhost:3001/genres");
    console.log(genres.data);

    return dispatch({
      type: "GET_GENRES",
      payload: genres.data,
    });
  };
}

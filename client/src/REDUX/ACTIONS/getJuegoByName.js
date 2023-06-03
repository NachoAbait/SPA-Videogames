import axios from "axios";

export function getJuegoByName(name) {
    return async function (dispatch) {
      try {
        var json = await axios.get(`/videogames?name=${name}`);
        return dispatch({
          type: "GET_JUEGO_BY_NAME",
          payload: json.data,
        });
      } catch (error) {
        return { msg: error };
      }
    };
  }
import axios from "axios";

export function getJuegos() {
  return async function (dispatch) {
    console.log("llegue a la action, aca van los juegos");
    var juegos = await axios.get("/videogames");
    console.log(juegos.data);

    return dispatch({
      type: "GET_JUEGOS",
      payload: juegos.data,
    });
  };
}

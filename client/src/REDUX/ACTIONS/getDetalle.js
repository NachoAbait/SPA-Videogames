import axios from "axios";

export function getDetalle(id) {
  return async function (dispatch) {
    var detalles = await axios.get(`/videogame/${id}`);
    console.log(detalles.data);

    return dispatch({
      type: "GET_DETALLE",
      payload: detalles.data,
    });
  };
}

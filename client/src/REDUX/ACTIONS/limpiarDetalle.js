export function limpiarDetalle() {
  return async function (dispatch) {
    return dispatch({
      type: "LIMPIAR_DETALLE",
      payload: "",
    });
  };
}

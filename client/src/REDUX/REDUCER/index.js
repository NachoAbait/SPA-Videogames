const initialState = {
  juegos: [],
  AllJuegos: [],
  genres: [],
  detalle: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_JUEGOS":
      return {
        ...state,
        juegos: action.payload,
        AllJuegos: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "FILTER_BY_GENRE":
      const juegosActuales = state.AllJuegos;
      const juegosFiltrados = juegosActuales.filter((juego) => {
        return juego.genres.some((genre) => genre.name === action.payload);
      });
      return {
        ...state,
        juegos: juegosFiltrados,
      };

    case "ORDEN":
      let sortedArr = [];
      const juegosToSort = [...state.juegos]; // Crear una copia del array de juegos
      if (action.payload === "A-Z") {
        sortedArr = juegosToSort.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "Z-A") {
        sortedArr = juegosToSort.sort((a, b) => b.name.localeCompare(a.name));
      } else if (action.payload === "rating") {
        sortedArr = juegosToSort.sort((a, b) => b.rating - a.rating);
      }
      return {
        ...state,
        juegos: sortedArr,
      };

    case "GET_JUEGO_BY_NAME":
      return {
        ...state,
        juegos: action.payload,
      };

    case "GET_DETALLE":
      return {
        ...state,
        detalle: action.payload,
      };

    case "LIMPIAR_DETALLE":
      return {
        ...state,
        detalle: {},
      };

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

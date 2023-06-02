const { API_KEY } = process.env;
const axios = require("axios");
/*
Ruta de detalle de videojuego: debe contener

[ ] Los campos mostrados en la ruta principal para cada videojuegos 
    (
    imagen   //                .background_image
    nombre   //                .name
    géneros  //                .genres  (array con objetos)
    )
[ ] Descripción //             .description
[ ] Fecha de lanzamiento //    .realeased
[ ] Rating //                  .rating
[ ] Plataformas                .platforms  (array con objetos)
*/

module.exports = async function (id) {
  try {
    console.log("Pedimmos los datos del juego a la API ");
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    console.log("Axios:[OK] Datos recibidos.");

    return response.data
     
    ;
  } catch (error) {
    return {
      msg: `Error al intentar traer el detalle del juego con el id: ${id} de la API`,
    };
  }
};

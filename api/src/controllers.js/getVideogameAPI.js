require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

module.exports = async function (name) {
  // SI NOS PASAN POR QUERY EL NOMBRE
  if (name) {
    try {
      console.log("Axios: Pidiendo lista de juegos x nombre");

      const response = (
        await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        )
      ).data.results;

      console.log("Axios: [OK] Lista de juegos x nombre recibida.");

      // FILTRAMOS SOLO LA INFORMACION NECESARIA (ID, NAME, IMAGE, GENRE) Y LA RETORNAMOS
      return response;
    } catch (error) {
      return { msg: "Error al intentar traer juegos x nombre de la API" };
    }
  } else {
    // SI NO NOS PASAN NOMBRE X QUERY, TRAEMOS LOS PRIMEROS 100 JUEGOS QUE ENCUENTRE
    try {
      console.log("pedimos el primero");
      const resultado = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100&page=1`
        )
      ).data.results;

      console.log("pedimos el segundo");
      const result2 = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100&page=2`
        )
      ).data.results;

      console.log("pedimos el tercero");
      const result3 = (
        await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100&page=3`
        )
      ).data.results;

      let result = resultado.concat(result2.concat(result3));

      // FILTRAMOS SOLO LA INFORMACION NECESARIA (ID, NAME, IMAGE, GENRE) Y LA RETORNAMOS

      for (let i = 0; i < result.length; i++) {
        result[i].id = "A" + result[i].id;
      }

      return result;
    } catch (error) {
      return { msg: "Error al intentar traer juegos de la API" };
    }
  }
};

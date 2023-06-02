require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

module.exports = async function () {
  //PEDIMOS LA LISTA DE GENEROS A LA API
  try {
    console.log("Pedimos lista de generos a la API");
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    console.log("Axios: [OK] Lista de generos recibida");

    //DEVOLVEMOS SOLO ID Y NOMBRE DE CADA UNO
    return response.data.results.map((e) => {
      return {
        id: e.id,
        name: e.name,
      };
    });
  } catch (error) {
    return { msg: "Error al solicitar generos a la API" };
  }
};

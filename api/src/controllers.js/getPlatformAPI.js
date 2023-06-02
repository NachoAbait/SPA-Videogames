require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

module.exports = async function () {
  //PEDIMOS LA LISTA DE PLATAFORMAS A LA API
  try {
    console.log("Pedimos lista de plataformas a la API");
    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    console.log("AXIOS: [OK] Lista de plataformas recibida");

    //DEVOLVEMOS SOLO ID Y NOMBRE DE CADA UNA
    return response.data.results.map((e) => {
      return {
        id: e.id,
        name: e.name,
      };
    });
  } catch (error) {
    return { msg: "Error al solicitar plataformas a la API" };
  }
};

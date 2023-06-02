// IMPORTAMOS LAS FUNCIONES DE LA API Y LA DB
const getVideogamesAPI = require("./getVideogameAPI");
const getVideogamesDB = require("./getVideogameDB");
const getVideogameDetailAPI = require("./getVideogameDetailAPI");
const getVideogameDetailDB = require("./getVideogameDetailDB");
const getGenresAPI = require("./getGenresAPI");
const getPlatformAPI = require("./getPlatformAPI");

// IMPORTAMOS LOS MODELOS
const { Videogame, Genre, Platform } = require("../db");

const SEARCH_PAGE_SIZE = 15; // Max games in the search page.
const MAX_GAMES = 100; // Max games in total.

module.exports = {
  getVideogamesAPI,
  getVideogamesDB,
  getVideogameDetailAPI,
  getVideogameDetailDB,
  getGenresAPI,
  getPlatformAPI,

  postVideogame: async function (
    name,
    description,
    date,
    rating,
    genres,
    platforms,
    img
  ) {
    // If we recieve a name, description and at least 1 platform (we should),
    // we try to store it in our DB.
    if (name && description /*&& platforms.length > 0*/) {
      const [submitted, created] = await Videogame.findOrCreate({
        where: { name },
        defaults: {
          description: description,
          release_date: date || null,
          rating: rating || null,
          background_url: img || null,
        },
      });

      let msg = "";

      if (created) {
        //AGREGAMOS LOS GENEROS Y LAS PLATAFORMAS A TABLA
        submitted.addGenres(genres);
        submitted.addPlatform(platforms);

        msg = "Videogame created succesfully";
      } else {
        msg = "Videogame already exists";
      }

      return {
        id: "L" + submitted.id, // IDENTIFICAMOS QUE SE AGREGA A LA DB NO A LA API
        created, // fue creado?
        msg, // detalle
      };
    } else {
      return {
        msg: "Back2Front: Revisa el formulario, puede faltar un campo obligatorio!!",
      };
    }
  },

  getVideogames: async function (name) {
    // TRAEMOS LOS JUEGOS DE LA DB
    let results = await getVideogamesDB(name);
    // LE AGREGAMOS LOS JUEGOS QUE TRAEMOS DESDE LA API
    results = results.concat(await getVideogamesAPI(name));

    // SI NOS PASAN UN NOMBRE PARA BUSCAR, DEBEMOS LIMITAR LA BUSQUEDA A 15 JUEGOS
    // DE LO CONTRARIO TRAEREMOS LOS PRIMEROS 100 JUEGOS
    // CORTAMOS EL ARRAY A LOS 15 O 100 CON UN SLICE
    results.splice(name ? SEARCH_PAGE_SIZE : MAX_GAMES);

    //SI NOS PASAN UN NOMBRE PERO NO SE ENCUENTRA NADA:
    if (name) {
      if (results.length === 0)
        return { msg: `No se encontraron juegos con ${name} en su nombre` };
    }

    return results;
  },

  getVideogameDetail: async function (id) {
    // PRIMERO VEMOS DONDE VAMOS A BUSCAR LA INFO, DB("L"id) O API("A"id)
    const local = id[0] === "L";

    // RETIRAMOS EL DISTINTIVO SEA "L" O "A" PARA LA BUSQUEDA
    const idNumber = Math.floor(id.slice(1) * 1);

    // RETORNAMOS UN MENSAJE DE ERROR SI EL ID ES INVALIDO
    if (isNaN(idNumber)) {
      return { msg: `El id ${id} es inválido.` };
    }
    //SI ESTA EN LA DB
    if (local) {
      console.log("Vamos a buscarlo en la DB");
      return await getVideogameDetailDB(id);
    } else {
      // SI SE TRAE DE LA API
      console.log("Vamos a buscarlo en la API");
      return await getVideogameDetailAPI(idNumber);
    }
  },

  getGenres: async function () {
    //PRIMERO BUSCAMOS LOS GENEROS EN LA DB
    let genresList = await Genre.findAll();

    // SI NO ENCONTRAMOS GENEROS, VAMOS A BUSCARLOS A TRAVES DE LA API
    if (!genresList.length) {
      genresList = await getGenresAPI();

      // LOS GUARDAMOS EN LA BASE DE DATOS PARA NO TENER QUE VOLVER A PEDIRSELOS A LA API
      await Genre.bulkCreate(genresList);
    }

    // RETORNAMOS LA LISTA DE GENEROS
    return genresList;
  },

  getPlatforms: async function () {
    //PRIMERO BUSCAMOS LOS GENEROS EN LA DB
    let platformList = await Platform.findAll();

    // SI NO ENCONTRAMOS GENEROS, VAMOS A BUSCARLOS A TRAVES DE LA API
    if (!platformList.length) {
      console.log("Busacamos las plataformas en la API");
      platformList = await getPlatformAPI();

      // LOS GUARDAMOS EN LA BASE DE DATOS PARA NO TENER QUE VOLVER A PEDIRSELOS A LA API
      await Platform.bulkCreate(platformList);
    } else {
      console.log("Buscamos las plataformas que haya en la DB");
    }

    // RETORNAMOS LA LISTA DE GENEROS
    return platformList;
  },
};

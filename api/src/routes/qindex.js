const { Router } = require("express");

// Importar todos los routers;

// IMPORTAMOS LAS RUTAS
const getVideogames = require("./getVideogames");
const postVideogames = require("./postVideogames");
const getVideogameDetail = require("./getVideogameDetail");
const getGenres = require("./getGenres");
const getPlatforms = require("./getPlatforms");

const router = Router();

// Configurar los routers
// ACLARAMOS QUE PATH UTILIZAR PARA CADA RUTA
router.use("/videogames", getVideogames);
router.use("/videogames", postVideogames);
router.use("/videogame", getVideogameDetail);
router.use("/genres", getGenres);

//router extra
router.use("/platforms", getPlatforms);

module.exports = router;

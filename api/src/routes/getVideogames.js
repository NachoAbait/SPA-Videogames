const { Router } = require("express");
const router = Router();
const control = require("../controllers.js");

// - - GET /videogames
// -
router.get("/", async (req, res) => {
  // OBTENEMOS EL NAME X QUERY SI LA HAY
  const { name } = req.query || null;
  // BUSCAMOS LOS JUEGOS EN LA DB Y API
  const results = await control.getVideogames(name);

  let code = results.msg ? 400 : 200;
  res.status(code).json(results);
});

module.exports = router;

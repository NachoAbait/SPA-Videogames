const { Router } = require("express");
const router = Router();
const { getVideogameDetail } = require("../controllers.js");

// - - GET /videogames/{idVideogame}
// -
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await getVideogameDetail(id); /*
  let code = response.msg ? 400 : 200;
  res.status(code).json(response);*/
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(404).send("No pudimos");
  }
});

module.exports = router;

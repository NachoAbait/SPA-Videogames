const { Router } = require("express");
const router = Router();
const { postVideogame } = require("../controllers.js");

// - - POST /videogames
// - Front requests writing data in our DB, with the data sent via the body

router.post("/", async (req, res) => {
  const { name, description, date, rating, genres, platforms, img } = req.body;
  const response = await postVideogame(
    name,
    description,
    date,
    rating,
    genres,
    platforms,
    img
  );
  let code = response.id ? 200 : 400;
  res.status(code).json(response);
});

module.exports = router;

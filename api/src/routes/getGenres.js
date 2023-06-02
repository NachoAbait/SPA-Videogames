const { Router } = require("express");
const router = Router();
const { getGenres } = require("../controllers.js");

router.get("/", async (req, res) => {
  const response = await getGenres();

  let code = response.msg ? 400 : 200;
  res.status(code).json(response);
});

module.exports = router;

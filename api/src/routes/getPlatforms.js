const { Router } = require("express");
const router = Router();
const { getPlatforms } = require("../controllers.js");

router.get("/", async (req, res) => {
  const response = await getPlatforms();

  let code = response.msg ? 400 : 200;
  res.status(code).json(response);
});

module.exports = router;

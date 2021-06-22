const express = require("express");
const router = express.Router();
const verifyAuth = require('../middlewares/verifyAuth')

router.get("/", (req, res) => {
  res.json({
    msg: "Bienvenido a Pingdom Copy",
  });
});


module.exports = router;

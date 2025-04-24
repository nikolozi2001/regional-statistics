const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const regionsController = require("../controllers/regionsController");

router.get("/", (req, res) => {
  const readmePath = path.join(__dirname, "../README.md");
  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading README.md");
    } else {
      res.type("text/plain").send(data);
    }
  });
});

router.get("/regions/:id", regionsController.getRegionById);
router.get("/regions", regionsController.getAllRegions);


module.exports = router;

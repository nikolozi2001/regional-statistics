const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Import all controllers
const regionsController = require("../controllers/regionsController");
const regionalStatsController = require("../controllers/regionalStatisticsController");

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

// Region routes
router.get("/regions", regionsController.getAllRegions);
router.get("/regions/:id", regionsController.getRegionById);
router.get("/regions/code/:code", regionsController.getRegionByCode);
router.post("/regions", regionsController.createRegion);
router.put("/regions/:id", regionsController.updateRegion);
router.delete("/regions/:id", regionsController.deleteRegion);

// Statistics categories routes
router.get("/categories", regionsController.getAllCategories);

// Basic statistics routes
router.get("/statistics/region/:regionId", regionsController.getRegionStatistics);
router.get("/statistics/region/:regionId/category/:categoryId", regionsController.getCategoryStatistics);
router.post("/statistics", regionsController.createStatistic);
router.put("/statistics/:id", regionsController.updateStatistic);
router.delete("/statistics/:id", regionsController.deleteStatistic);
router.get("/statistics/compare", regionsController.compareStatistics);
router.get("/statistics/timeseries/:statName/:regionId", regionsController.getTimeSeriesData);

// Regional statistics comprehensive routes (Georgian)
router.get(
  "/statistics/comprehensive/:regionId", 
  regionalStatsController.getRegionalStatistics
);

router.get(
  "/statistics/comprehensive/:regionId/:section", 
  regionalStatsController.getRegionalStatisticSection
);

router.get(
  "/statistics/comprehensive/compare/:section", 
  regionalStatsController.compareRegionalStatisticSection
);

router.put(
  "/statistics/comprehensive/:regionId/:section", 
  regionalStatsController.updateRegionalStatisticSection
);

// Regional statistics comprehensive routes (English)
router.get(
  "/statistics/comprehensive/:regionId/en", 
  regionalStatsController.getRegionalStatisticsEn
);

router.get(
  "/statistics/comprehensive/:regionId/:section/en", 
  regionalStatsController.getRegionalStatisticSectionEn
);

router.get(
  "/statistics/comprehensive/compare/:section/en", 
  regionalStatsController.compareRegionalStatisticSectionEn
);

router.put(
  "/statistics/comprehensive/:regionId/:section/en", 
  regionalStatsController.updateRegionalStatisticSectionEn
);

// File upload route
router.post("/upload", regionsController.uploadFile);

module.exports = router;
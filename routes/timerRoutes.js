const express = require("express");

const { getTimer, updateTimer } = require("../controllers/timerController");

const router = express.Router();

// http://localhost:4000/api/timer/project
router.get("/:id", getTimer);

// http://localhost:4000/api/timer/project
router.put("/:id", updateTimer);

module.exports = {
  routes: router,
};

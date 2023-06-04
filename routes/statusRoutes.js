const express = require("express");

const { updateStatus, getStatus } = require("../controllers/statusController");

const router = express.Router();

// http://localhost:4000/api/status/project
router.get("/:id", getStatus);

// http://localhost:4000/api/status/project
router.put("/:id", updateStatus);

module.exports = {
  routes: router,
};

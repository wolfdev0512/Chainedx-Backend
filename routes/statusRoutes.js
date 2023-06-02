const express = require("express");

const { updateStatus, getStatus } = require("../controllers/statusController");

const router = express.Router();

// http://localhost:4000/api/status/projectStatus
router.put("/:id", updateStatus);

// http://localhost:4000/api/status/projectStatus
router.get("/:id", getStatus);

module.exports = {
  routes: router,
};

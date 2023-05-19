const express = require("express");

const { updateStatus } = require("../controllers/statusController");

const router = express.Router();

// http://localhost:4000/api/user/:user_id
router.put("/:id", updateStatus);

module.exports = {
  routes: router,
};

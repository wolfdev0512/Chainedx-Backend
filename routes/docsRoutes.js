const express = require("express");

const { getDocs, updateDocs } = require("../controllers/docsController");

const router = express.Router();

// http://localhost:4000/api/timer/project
router.get("/:id", getDocs);

// http://localhost:4000/api/timer/project
router.put("/:id", updateDocs);

module.exports = {
  routes: router,
};

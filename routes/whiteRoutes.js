const express = require("express");

const { getWhite, updateWhite } = require("../controllers/whiteController");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// http://localhost:4000/api/white/project
router.get("/:id", getWhite);

// http://localhost:4000/api/white/project
router.put("/:id", upload.single("white"), updateWhite);

module.exports = {
  routes: router,
};

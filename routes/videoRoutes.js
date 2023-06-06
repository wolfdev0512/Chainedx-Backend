const express = require("express");

const { getVideo, updateVideo } = require("../controllers/videoController");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// http://localhost:4000/api/white/project
router.get("/:id", getVideo);

// http://localhost:4000/api/white/project
router.put("/:id", upload.single("video"), updateVideo);

module.exports = {
  routes: router,
};

const express = require("express");

const {
  addTeam,
  getAllTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// http://localhost:4000/api/team

router.post("/", upload.single("image"), addTeam);

// http://localhost:4000/api/team
router.get("/", getAllTeams);

// http://localhost:4000/api/user/:team_id
router.get("/:id", getTeam);

// http://localhost:4000/api/user/:user_id
router.put("/:id", upload.single("image"), updateTeam);

// http://localhost:4000/api/user/:user_id
router.delete("/:id", deleteTeam);

module.exports = {
  routes: router,
};

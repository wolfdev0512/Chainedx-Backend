const express = require("express");
const {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// http://localhost:4000/api/user

router.post("/", upload.single("image"), addUser);

// http://localhost:4000/api/user
router.get("/", getAllUsers);

// http://localhost:4000/api/user/:wallet
router.get("/:wallet", getUser);

// http://localhost:4000/api/user/:user_id
router.put("/:id", upload.single("image"), updateUser);

// http://localhost:4000/api/user/:user_id
router.delete("/:id", deleteUser);

module.exports = {
  routes: router,
};

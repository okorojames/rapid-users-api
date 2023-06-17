const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  postUser,
  deleteUser,
  updateUser,
} = require("../controllers/rapid-cont");
router.get("/users", getUsers);
router.post("/post-user", postUser);
router.get("/user/:id", getUser);
router.delete("/delete-user/:id", deleteUser);
router.patch("/update-user/:id", updateUser);
module.exports = router;

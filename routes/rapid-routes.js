const express = require("express");
const router = express.Router();
const { getUsers, getUser, postUser } = require("../controllers/rapid-cont");
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/post-user", postUser);
module.exports = router;

const RapidSchema = require("../models/rapid-model");
const mongoose = require("mongoose");

// post user
const postUser = async (req, res) => {
  const { title, desc } = req.body;
  console.log(req.body);
  try {
    if (!title || !desc) {
      return res.status(400).json({ msg: "Please fill in al fields" });
    } else {
      const rapidUser = new RapidSchema({ title, desc });
      await rapidUser.save();
      return res.status(201).json(rapidUser);
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

// get users
const getUsers = async (req, res) => {
  try {
    const rapid_users = await RapidSchema.find().sort({ createdAt: -1 });
    return res.status(200).json(rapid_users);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

// get user
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const rapid_user = await RapidSchema.findById(id);

    // check if user id field is empty
    if ((await RapidSchema.findById(id)) === null) {
      return res.status(400).json({ msg: "No such user or details found" });
    }

    // check if user id is not valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "id used it not valid" });
    }

    // return success if req is valid
    return res.status(200).json(rapid_user);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await RapidSchema.findByIdAndDelete(id);
    return res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updated_rapid_user = await RapidSchema.findByIdAndUpdate(id, {
      ...req.body,
      new: true,
    });
    return res.status(200).json(updated_rapid_user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// export controllers
module.exports = { getUsers, getUser, postUser, deleteUser, updateUser };

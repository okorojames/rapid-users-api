const { default: mongoose } = require("mongoose");
const RapidSchema = require("../models/rapid-model");

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
    const rapid_users = await RapidSchema.find().sort({ createdAt: 1 });
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
    if ((await RapidSchema.findById(id)) === null) {
      return res.status(400).json({ msg: "No such user or details found" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "id used it not valid" });
    }
    return res.status(200).json(rapid_user);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

// export controllers
module.exports = { getUsers, getUser, postUser };

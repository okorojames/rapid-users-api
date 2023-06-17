const mongose = require("mongoose");
const RapidSchema = mongose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongose.model("rapid-user", RapidSchema);

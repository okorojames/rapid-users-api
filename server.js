const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/rapid-routes");
const db = require("./configs/db-config");
const cors = require("cors");
// requiring dotenv
require("dotenv").config();
const PORT = process.env.PORT;

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/api/rapid", routes);

// basic get request
app.get("/api/rapid", (req, res) => {
  res.send("This is a home route");
  return;
});

// app listening
app.listen(PORT, () => {
  db.connectDB();
  console.log(`app is listening at port ${PORT}`);
});

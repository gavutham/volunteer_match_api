const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const eventRoute = require("./routes/event");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Succesfully Connected to database."))
  .catch((err) => console.error(err));

app.use("/auth/", authRoute);
app.use("/user/", userRoute);
app.use("/event/", eventRoute);

app.listen(process.env.PORT || 5010, () => {
  console.log("Server is up");
});

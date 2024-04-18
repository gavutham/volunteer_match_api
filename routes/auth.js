const router = require("express").Router();
const User = require("../models/User");

//Register
router.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      tags: req.body.tags,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.password === req.body.password) {
        res.status(200).json(user._doc);
      } else {
        res.status(400).json("Wrong Credintials");
      }
    } else {
      res.status(400).json("User Not Found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");

router.put("/:id", async (req, res) => {
  if (req.body._id == req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser._doc);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update your account Only");
  }
});

module.exports = router;

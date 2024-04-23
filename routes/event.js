const router = require("express").Router();
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const event = await newEvent.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

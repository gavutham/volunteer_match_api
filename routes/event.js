const router = require("express").Router();
const Event = require("../models/Event");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const event = await newEvent.save();

    await User.findByIdAndUpdate(req.body.uid, {
      $push: { events: event._id },
    });

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updateEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/opt", async (req, res) => {
  try {
    const eventId = req.query.eventId;
    const uId = req.query.uId;

    if (eventId === undefined || uId === undefined) {
      res.status(400).json({ message: "Invalid request query" });
      return;
    }

    await Event.findByIdAndUpdate(eventId, {
      $push: { opted: uId },
    });

    await User.findByIdAndUpdate(uId, {
      $push: { events: eventId },
      $pull: { requests: { $eq: eventId } },
    });

    res.status(200).json({ message: "User Opted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/unopt", async (req, res) => {
  try {
    const eventId = req.query.eventId;
    const uId = req.query.uId;

    if (eventId === undefined || uId === undefined) {
      res.status(400).json({ message: "Invalid request query" });
      return;
    }

    await Event.findByIdAndUpdate(eventId, {
      $pull: { opted: { $eq: uId } },
    });

    await User.findByIdAndUpdate(uId, {
      $pull: { events: { $eq: eventId } },
    });

    res.status(200).json({ message: "User Un-Opted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

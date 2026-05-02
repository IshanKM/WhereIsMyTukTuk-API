import express from "express";
import Location from "../models/Location.js";
import TukTuk from "../models/TukTuk.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// POST location (device sends GPS)
router.post("/", async (req, res) => {
  try {
    const { tuktuk, latitude, longitude, speed } = req.body;

    // ❗ validate tuktuk exists
    const tukExists = await TukTuk.findById(tuktuk);
    if (!tukExists) {
      return res.status(400).json({ error: "Invalid TukTuk ID" });
    }

    const location = new Location({
      tuktuk,
      latitude,
      longitude,
      speed,
    });

    await location.save();

    await TukTuk.findByIdAndUpdate(tuktuk, {
      lastKnownLocation: {
        latitude,
        longitude,
        timestamp: new Date(),
      },
    });

    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all locations (for now)
router.get("/", async (req, res) => {
  const locations = await Location.find().populate("tuktuk");
  res.json(locations);
});

 // GET latest location of ALL tuk-tuks
router.get("/latest", authMiddleware, async (req, res) => {
  try {
    let filter = {};

    // 🔥 automatic police filtering
    if (req.user.role === "police") {
      filter.district = req.user.policeStation.district._id;
    }

    const tuktuks = await TukTuk.find(filter)
      .populate("driver")
      .populate("district");

    const result = tuktuks.map((tuk) => ({
      id: tuk._id,
      registrationNumber: tuk.registrationNumber,
      driver: tuk.driver?.name,
      district: tuk.district?.name,
      lastKnownLocation: tuk.lastKnownLocation,
      status: tuk.status,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET history of a tuk-tuk
router.get("/history/:tuktukId", async (req, res) => {
  try {
    const { tuktukId } = req.params;
    const { from, to } = req.query;

    let filter = { tuktuk: tuktukId };

    // optional time filtering
    if (from && to) {
      filter.recordedAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const locations = await Location.find(filter)
      .sort({ recordedAt: 1 }) // oldest → newest
      .populate("tuktuk");

    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
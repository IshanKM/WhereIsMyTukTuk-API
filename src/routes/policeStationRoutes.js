import express from "express";
import PoliceStation from "../models/PoliceStation.js";

const router = express.Router();

// Create police station
router.post("/", async (req, res) => {
  const station = await PoliceStation.create(req.body);
  res.json(station);
});

// Get all stations
router.get("/", async (req, res) => {
  const stations = await PoliceStation.find().populate("district");
  res.json(stations);
});

export default router;
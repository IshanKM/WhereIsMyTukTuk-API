import express from "express";
import District from "../models/District.js";

const router = express.Router();

// Create district
router.post("/", async (req, res) => {
  const district = await District.create(req.body);
  res.json(district);
});

// Get all districts
router.get("/", async (req, res) => {
  const districts = await District.find().populate("province");
  res.json(districts);
});

export default router;
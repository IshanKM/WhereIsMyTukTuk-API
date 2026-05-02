import express from "express";
import Province from "../models/Province.js";

const router = express.Router();

// Create province
router.post("/", async (req, res) => {
  const province = await Province.create(req.body);
  res.json(province);
});

// Get all provinces
router.get("/", async (req, res) => {
  const provinces = await Province.find();
  res.json(provinces);
});

export default router;
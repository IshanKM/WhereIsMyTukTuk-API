import express from "express";
import Province from "../models/Province.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Create province
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const province = await Province.create(req.body);
  res.json(province);
});

// Get all provinces
router.get("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  const provinces = await Province.find();
  res.json(provinces);
});

export default router;
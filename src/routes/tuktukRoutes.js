import express from "express";
import TukTuk from "../models/TukTuk.js";
import Driver from "../models/Driver.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();


// CREATE TukTuk
router.post("/",authMiddleware,roleMiddleware("admin", "operator"), async (req, res) => {
  try {
    const { registrationNumber, driver } = req.body;

    // check driver exists
    const existingDriver = await Driver.findById(driver);
    if (!existingDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    const tuk = new TukTuk(req.body);
    await tuk.save();

    res.status(201).json(tuk);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET all TukTuks
router.get("/",authMiddleware,roleMiddleware("admin", "operator"), async (req, res) => {
  const tuktuks = await TukTuk.find().populate("driver");
  res.json(tuktuks);
});


// GET single TukTuk
router.get("/:id",authMiddleware,roleMiddleware("admin", "operator"), async (req, res) => {
  const tuk = await TukTuk.findById(req.params.id).populate("driver");

  if (!tuk) {
    return res.status(404).json({ error: "TukTuk not found" });
  }

  res.json(tuk);
});


// UPDATE TukTuk
router.put("/:id",authMiddleware,roleMiddleware("admin", "operator"), async (req, res) => {
  try {
    const tuk = await TukTuk.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("driver");

    res.json(tuk);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// DELETE TukTuk
router.delete("/:id",authMiddleware,roleMiddleware("admin", "operator"), async (req, res) => {
  await TukTuk.findByIdAndDelete(req.params.id);
  res.json({ message: "TukTuk deleted" });
});

export default router;
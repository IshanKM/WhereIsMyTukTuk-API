import express from "express";
import Driver from "../models/Driver.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  res.json(driver);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(driver);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ message: "Driver deleted" });
});

export default router;
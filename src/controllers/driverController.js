import Driver from "../models/Driver.js";

export const createDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDrivers = async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
};

export const getDriverById = async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  res.json(driver);
};

export const updateDriver = async (req, res) => {
  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(driver);
};

export const deleteDriver = async (req, res) => {
  await Driver.findByIdAndDelete(req.params.id);
  res.json({ message: "Driver deleted" });
};
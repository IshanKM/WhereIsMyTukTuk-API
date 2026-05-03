import express from "express";
import Location from "../models/Location.js";
import TukTuk from "../models/TukTuk.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location tracking and monitoring
 */


/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Send GPS location data (Admin, Police)
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tuktuk: TUKTUK_ID
 *             latitude: 6.9271
 *             longitude: 79.8612
 *             speed: 35
 *     responses:
 *       201:
 *         description: Location stored successfully
 *       400:
 *         description: Invalid data
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.POLICE),
  async (req, res) => {
    try {
      const { tuktuk, latitude, longitude, speed } = req.body;

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
  }
);


/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all location records
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: List of all locations
 */
router.get("/", async (req, res) => {
  const locations = await Location.find().populate("tuktuk");
  res.json(locations);
});


/**
 * @swagger
 * /locations/latest:
 *   get:
 *     summary: Get latest location of all tuk-tuks
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest location per tuk-tuk
 */
router.get("/latest", authMiddleware, async (req, res) => {
  try {
    let filter = {};

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


/**
 * @swagger
 * /locations/history/{tuktukId}:
 *   get:
 *     summary: Get location history of a tuk-tuk
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tuktukId
 *         required: true
 *         schema:
 *           type: string
 *         description: TukTuk ID
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date
 *     responses:
 *       200:
 *         description: Location history
 */
router.get(
  "/history/:tuktukId",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.POLICE),
  async (req, res) => {
    try {
      const { tuktukId } = req.params;
      const { from, to } = req.query;

      let filter = { tuktuk: tuktukId };

      if (from && to) {
        filter.recordedAt = {
          $gte: new Date(from),
          $lte: new Date(to),
        };
      }

      const locations = await Location.find(filter)
        .sort({ recordedAt: 1 })
        .populate("tuktuk");

      res.json(locations);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
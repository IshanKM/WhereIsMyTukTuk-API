import express from "express";
import PoliceStation from "../models/PoliceStation.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PoliceStations
 *   description: Police station management (Admin only)
 */


/**
 * @swagger
 * /policestations:
 *   post:
 *     summary: Create a new police station (Admin only)
 *     tags: [PoliceStations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Colombo Central Police
 *             district: DISTRICT_ID
 *     responses:
 *       200:
 *         description: Police station created
 *       403:
 *         description: Access denied
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    const station = await PoliceStation.create(req.body);
    res.json(station);
  }
);


/**
 * @swagger
 * /policestations:
 *   get:
 *     summary: Get all police stations (Admin only)
 *     tags: [PoliceStations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of police stations
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    const stations = await PoliceStation.find().populate("district");
    res.json(stations);
  }
);


/**
 * @swagger
 * /policestations/{id}:
 *   put:
 *     summary: Update police station (Admin only)
 *     tags: [PoliceStations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Police station ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Police Station
 *     responses:
 *       200:
 *         description: Police station updated
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    try {
      const station = await PoliceStation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(station);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


/**
 * @swagger
 * /policestations/{id}:
 *   delete:
 *     summary: Delete police station (Admin only)
 *     tags: [PoliceStations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Police station ID
 *     responses:
 *       200:
 *         description: Police station deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    await PoliceStation.findByIdAndDelete(req.params.id);
    res.json({ message: "Police station deleted" });
  }
);

export default router;
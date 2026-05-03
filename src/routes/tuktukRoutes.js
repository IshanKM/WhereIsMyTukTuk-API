import express from "express";
import TukTuk from "../models/TukTuk.js";
import Driver from "../models/Driver.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TukTuks
 *   description: TukTuk management
 */


/**
 * @swagger
 * /tuktuks:
 *   post:
 *     summary: Create a new TukTuk (Admin, Operator)
 *     tags: [TukTuks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             registrationNumber: WP-4567
 *             driver: DRIVER_ID
 *             model: Bajaj
 *             color: Green
 *             type: 4-stroke
 *     responses:
 *       201:
 *         description: TukTuk created successfully
 *       404:
 *         description: Driver not found
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.OPERATOR),
  async (req, res) => {
    try {
      const { driver } = req.body;

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
  }
);


/**
 * @swagger
 * /tuktuks:
 *   get:
 *     summary: Get all TukTuks (Admin, Operator)
 *     tags: [TukTuks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of TukTuks
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.OPERATOR),
  async (req, res) => {
    const tuktuks = await TukTuk.find().populate("driver");
    res.json(tuktuks);
  }
);


/**
 * @swagger
 * /tuktuks/{id}:
 *   get:
 *     summary: Get TukTuk by ID
 *     tags: [TukTuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TukTuk ID
 *     responses:
 *       200:
 *         description: TukTuk details
 *       404:
 *         description: TukTuk not found
 */
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.OPERATOR),
  async (req, res) => {
    const tuk = await TukTuk.findById(req.params.id).populate("driver");

    if (!tuk) {
      return res.status(404).json({ error: "TukTuk not found" });
    }

    res.json(tuk);
  }
);


/**
 * @swagger
 * /tuktuks/{id}:
 *   put:
 *     summary: Update TukTuk (Admin, Operator)
 *     tags: [TukTuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             color: Red
 *             status: active
 *     responses:
 *       200:
 *         description: TukTuk updated
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.OPERATOR),
  async (req, res) => {
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
  }
);


/**
 * @swagger
 * /tuktuks/{id}:
 *   delete:
 *     summary: Delete TukTuk (Admin, Operator)
 *     tags: [TukTuks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TukTuk deleted
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.OPERATOR),
  async (req, res) => {
    await TukTuk.findByIdAndDelete(req.params.id);
    res.json({ message: "TukTuk deleted" });
  }
);

export default router;
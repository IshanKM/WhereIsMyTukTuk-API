import express from "express";
import District from "../models/District.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District management
 */


/**
 * @swagger
 * /districts:
 *   post:
 *     summary: Create a new district
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Colombo
 *             province: PROVINCE_ID
 *     responses:
 *       200:
 *         description: District created successfully
 */
router.post("/", async (req, res) => {
  const district = await District.create(req.body);
  res.json(district);
});


/**
 * @swagger
 * /districts:
 *   get:
 *     summary: Get all districts
 *     tags: [Districts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of districts
 */
router.get("/", async (req, res) => {
  const districts = await District.find().populate("province");
  res.json(districts);
});

export default router;
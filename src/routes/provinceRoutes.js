import express from "express";
import Province from "../models/Province.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Provinces
 *   description: Province management (Admin only)
 */


/**
 * @swagger
 * /provinces:
 *   post:
 *     summary: Create a new province (Admin only)
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Western
 *     responses:
 *       200:
 *         description: Province created
 *       403:
 *         description: Access denied
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    const province = await Province.create(req.body);
    res.json(province);
  }
);


/**
 * @swagger
 * /provinces:
 *   get:
 *     summary: Get all provinces (Admin only)
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of provinces
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    const provinces = await Province.find();
    res.json(provinces);
  }
);


/**
 * @swagger
 * /provinces/{id}:
 *   put:
 *     summary: Update province (Admin only)
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Province ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Province Name
 *     responses:
 *       200:
 *         description: Province updated
 *       403:
 *         description: Access denied
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    try {
      const province = await Province.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(province);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);


/**
 * @swagger
 * /provinces/{id}:
 *   delete:
 *     summary: Delete province (Admin only)
 *     tags: [Provinces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Province ID
 *     responses:
 *       200:
 *         description: Province deleted
 *       403:
 *         description: Access denied
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  async (req, res) => {
    await Province.findByIdAndDelete(req.params.id);
    res.json({ message: "Province deleted" });
  }
);

export default router;
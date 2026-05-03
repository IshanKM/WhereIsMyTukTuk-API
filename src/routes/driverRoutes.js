import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

import {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driverController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver management
 */


/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create a new driver (Admin, Operator)
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Ishan Madushanka
 *             nic: 200012345678
 *             licenseNumber: B1234567
 *             phone: 0771234567
 *             address: Colombo
 *     responses:
 *       201:
 *         description: Driver created successfully
 *       403:
 *         description: Access denied
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.OPERATOR),
  createDriver
);


/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drivers
 */
router.get("/", authMiddleware, getDrivers);


/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Get driver by ID
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Driver details
 */
router.get("/:id", authMiddleware, getDriverById);


/**
 * @swagger
 * /drivers/{id}:
 *   put:
 *     summary: Update driver (Admin, Operator)
 *     tags: [Drivers]
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
 *             phone: 0779999999
 *     responses:
 *       200:
 *         description: Driver updated
 *       403:
 *         description: Access denied
 */
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.OPERATOR),
  updateDriver
);


/**
 * @swagger
 * /drivers/{id}:
 *   delete:
 *     summary: Delete driver (Admin only)
 *     tags: [Drivers]
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
 *         description: Driver deleted
 *       403:
 *         description: Access denied
 */
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN),
  deleteDriver
);

export default router;
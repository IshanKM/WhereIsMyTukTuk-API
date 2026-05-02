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

router.post("/", authMiddleware, roleMiddleware(ROLES.ADMIN,ROLES.OPERATOR), createDriver);

router.get("/", authMiddleware, getDrivers);
router.get("/:id", authMiddleware, getDriverById);

router.put("/:id", authMiddleware, roleMiddleware("admin", "operator"), updateDriver);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDriver);

export default router;
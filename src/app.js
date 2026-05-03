import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import driverRoutes from "./routes/driverRoutes.js";
import tuktukRoutes from "./routes/tuktukRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import provinceRoutes from "./routes/provinceRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import policeStationRoutes from "./routes/policeStationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";

import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";


const API_VERSION = "/api/v1";

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.json({ limit: "10kb" }));

app.use("/", homeRoutes);
app.use(`${API_VERSION}/drivers`, driverRoutes);
app.use(`${API_VERSION}/tuktuks`, tuktukRoutes);
app.use(`${API_VERSION}/locations`, locationRoutes);
app.use(`${API_VERSION}/provinces`, provinceRoutes);
app.use(`${API_VERSION}/districts`, districtRoutes);
app.use(`${API_VERSION}/policestations`, policeStationRoutes);
app.use(`${API_VERSION}/auth`, authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: "Too many requests, please try again later",
});

app.use(limiter);
//app.use(mongoSanitize());
//app.use(xss());




export default app;
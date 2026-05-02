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

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/drivers", driverRoutes); 
app.use("/api/tuktuks", tuktukRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/policestations", policeStationRoutes);
app.use("/api/auth", authRoutes);


export default app;
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>TukTuk Tracking API</title>
        <style>
          body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #141e30, #243b55);
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            text-align: center;
            max-width: 600px;
          }
          h1 {
            font-size: 3.5rem;
            margin-bottom: 10px;
          }
          .subtitle {
            font-size: 1.2rem;
            opacity: 0.85;
            margin-bottom: 20px;
          }
          .welcome {
            font-size: 1rem;
            opacity: 0.7;
            margin-bottom: 30px;
          }
          .btn {
            text-decoration: none;
            color: #00d4ff;
            border: 2px solid #00d4ff;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: bold;
          }
          .btn:hover {
            background: #00d4ff;
            color: #000;
          }
          .footer {
            margin-top: 25px;
            font-size: 0.85rem;
            opacity: 0.6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚖 TukTuk Tracking API</h1>
          <div class="subtitle">
            Real-time Vehicle Tracking & Monitoring System
          </div>
          <div class="welcome">
            Welcome to the TukTuk Tracking API. This system provides real-time location tracking,
            historical movement analysis, and secure access for administrators, police, and operators.
          </div>
          <a class="btn" href="/api-docs">📄 Explore API Documentation</a>
          <div class="footer">
            Version 1.0 • Coursework Project
          </div>
        </div>
      </body>
    </html>
  `);
});

export default router;
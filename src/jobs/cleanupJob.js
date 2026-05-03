import cron from "node-cron";
import Location from "../models/Location.js";

// runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const result = await Location.deleteMany({
      recordedAt: { $lt: sixMonthsAgo },
    });

    console.log("Old locations deleted:", result.deletedCount);
  } catch (err) {
    console.error("Cleanup error:", err);
  }
});
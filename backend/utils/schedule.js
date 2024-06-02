const cron = require("node-cron");
const db = require("../config/dbconfig");

cron.schedule("*/5 * * * *", async () => {
  const q = `UPDATE showseats SET SeatStatus = 'EMPTY' WHERE SeatStatus = 'LOCKED' AND TIMESTAMPDIFF(MINUTE, UpdatedAt, NOW()) >= 5`;

  try {
    await new Promise((resolve, reject) => {
      db.query(q, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.error("Error updating seat status:", error);
  }
});

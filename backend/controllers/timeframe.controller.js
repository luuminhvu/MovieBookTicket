const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const db = require("../config/dbconfig");

const getAllTimeFrame = async (req, res) => {
  try {
    const q = "SELECT * FROM `timeframes`";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "Timeframe fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const addTimeframe = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const q = `INSERT INTO timeframes(StartTime, EndTime) VALUES('${startTime}', '${endTime}')`;
    db.query(q, async (err, result) => {
      if (err) {
        return ErrorResponse(res, 500, "Internal Server Error", err);
      }
      const selectQuery = `SELECT * FROM timeframes WHERE TimeFrameID = ?`;
      db.query(selectQuery, [result.insertId], (err, data) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        SuccessResponse(res, 200, "Timeframe added successfully", data[0]);
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};

module.exports = { getAllTimeFrame, addTimeframe };

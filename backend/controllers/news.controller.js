const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const cloudinary = require("../utils/cloudinary");
const db = require("../config/dbconfig");

const getNews = async (req, res, next) => {
  try {
    const q = "SELECT * FROM `news`";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "News fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const q = `SELECT * FROM news WHERE NewsID = ${id}`;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "News fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const addNews = async (req, res) => {
  try {
    const { Title, Content, Image, Category, Author } = req.body;
    const uploadRes = await cloudinary.uploader.upload(Image, {
      upload_preset: "MovieBookTicket",
    });
    if (uploadRes) {
      const q = `INSERT INTO news (Title, Content, Image, Active, Category, Author) VALUES ('${Title}', '${Content}', '${uploadRes.secure_url}', 1, '${Category}', '${Author}')`;
      db.query(q, async (err, result) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        const newsID = result.insertId;
        const selectQuery = `SELECT * FROM news WHERE NewsID = ${newsID}`;
        db.query(selectQuery, (err, data) => {
          if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
          SuccessResponse(res, 200, "News added successfully", data);
        });
      });
    }
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const updateNews = async (req, res) => {
  try {
    const { NewsID, Title, Content, Image, Category, Author, Active } =
      req.body;

    let imageUrl;
    if (Image && Image !== "") {
      const uploadRes = await cloudinary.uploader.upload(Image, {
        upload_preset: "MovieBookTicket",
      });
      imageUrl = uploadRes.secure_url;
    }

    const updateFields = [];
    const updateValues = [];

    if (Title) {
      updateFields.push("Title = ?");
      updateValues.push(Title);
    }
    if (Content) {
      updateFields.push("Content = ?");
      updateValues.push(Content);
    }
    if (imageUrl) {
      updateFields.push("Image = ?");
      updateValues.push(imageUrl);
    }
    if (Category) {
      updateFields.push("Category = ?");
      updateValues.push(Category);
    }
    if (Author) {
      updateFields.push("Author = ?");
      updateValues.push(Author);
    }
    if (Active !== undefined) {
      updateFields.push("Active = ?");
      updateValues.push(Active);
    }

    updateValues.push(NewsID);

    const q = `UPDATE news SET ${updateFields.join(", ")} WHERE NewsID = ?`;

    db.query(q, updateValues, (err, result) => {
      if (err) {
        return ErrorResponse(res, 500, "Internal Server Error", err);
      }

      const selectQuery = `SELECT * FROM news WHERE NewsID = ?`;
      db.query(selectQuery, [NewsID], (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        SuccessResponse(res, 200, "News updated successfully", data);
      });
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const deleteNews = (req, res, next) => {
  try {
    const { id } = req.params;
    const q = `DELETE FROM news WHERE NewsID = '${id}'`;
    db.query(q, (err, data) => {
      if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
      SuccessResponse(res, 200, "News deleted successfully", data);
    });
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
module.exports = {
  getNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
};

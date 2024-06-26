const SuccessResponse = require("../common/Response/Success");
const ErrorResponse = require("../common/Response/Error");
const cloudinary = require("../utils/cloudinary");
const dayjs = require("dayjs");
const db = require("../config/dbconfig");
const getMovies = async (req, res) => {
  try {
    const q = "SELECT * FROM `movies`";
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "Movies fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const getMovieDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const q = `SELECT * FROM movies WHERE MovieID = ${id}`;
    const data = await new Promise((resolve, reject) => {
      db.query(q, (err, data) => {
        if (err) return ErrorResponse(res, 500, "Internal Server Error", err);
        resolve(data);
      });
    });
    SuccessResponse(res, 200, "Movie fetched successfully", data);
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const addMovie = async (req, res, next) => {
  try {
    const {
      Actors,
      Age,
      Country,
      Description,
      Directors,
      Duration,
      Genres,
      Language,
      Name,
      Poster,
      Rating,
      ReleaseDate,
      Subtitle,
      Trailer,
      Active,
      Upcoming,
    } = req.body;
    const uploadRes = await cloudinary.uploader.upload(Poster, {
      upload_preset: "MovieBookTicket",
    });
    const formatReleaseDate = dayjs(ReleaseDate).format("YYYY-MM-DD HH:mm:ss");
    if (uploadRes) {
      const q = `INSERT INTO movies (Name, Poster, Trailer, Description, Duration, ReleaseDate, Rating, Language, Country, Age, Subtitle, Genres, Actors, Directors, Active, Upcoming) VALUES ('${Name}', '${uploadRes.secure_url}', '${Trailer}', '${Description}', '${Duration}', '${formatReleaseDate}', '${Rating}', '${Language}', '${Country}', '${Age}', '${Subtitle}', '${Genres}', '${Actors}', '${Directors}', '${Active}', '${Upcoming}')`;
      db.query(q, async (err, result) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        const selectQuery = `SELECT * FROM movies WHERE MovieID = ?`;
        db.query(selectQuery, [result.insertId], (err, data) => {
          if (err) {
            return ErrorResponse(res, 500, "Internal Server Error", err);
          }
          SuccessResponse(res, 200, "Movie added successfully", data[0]);
        });
      });
    }
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
const editMovie = async (req, res, next) => {
  try {
    const {
      MovieID,
      Actors,
      Age,
      Country,
      Description,
      Directors,
      Duration,
      Genres,
      Language,
      Name,
      Poster,
      Rating,
      ReleaseDate,
      Subtitle,
      Trailer,
      Active,
      Upcoming,
    } = req.body;
    const formatReleaseDate = dayjs(ReleaseDate).format("YYYY-MM-DD HH:mm:ss");

    if (Poster && Poster.includes("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(Poster, {
        upload_preset: "MovieBookTicket",
      });
      if (uploadRes) {
        const q = `UPDATE movies SET Name = '${Name}', Poster = '${uploadRes.secure_url}', Trailer = '${Trailer}', Description = '${Description}', Duration = '${Duration}', ReleaseDate = '${formatReleaseDate}', Rating = '${Rating}', Language = '${Language}', Country = '${Country}', Age = '${Age}', Subtitle = '${Subtitle}', Genres = '${Genres}', Actors = '${Actors}', Directors = '${Directors}', Active = '${Active}', Upcoming = '${Upcoming}' WHERE MovieID = ${MovieID}`;
        await db.query(q, async (err, result) => {
          if (err) {
            return ErrorResponse(res, 500, "Internal Server Error", err);
          }
          const selectQuery = `SELECT * FROM movies WHERE MovieID = ?`;
          db.query(selectQuery, [MovieID], (err, data) => {
            if (err) {
              return ErrorResponse(res, 500, "Internal Server Error", err);
            }
            SuccessResponse(res, 200, "Movie updated successfully", data[0]);
          });
        });
      }
    } else {
      const q = `UPDATE movies SET Name = '${Name}', Trailer = '${Trailer}', Description = '${Description}', Duration = '${Duration}', ReleaseDate = '${formatReleaseDate}', Rating = '${Rating}', Language = '${Language}', Country = '${Country}', Age = '${Age}', Subtitle = '${Subtitle}', Genres = '${Genres}', Actors = '${Actors}', Directors = '${Directors}', Active = '${Active}', Upcoming = '${Upcoming}' WHERE MovieID = ${MovieID}`;
      db.query(q, async (err, result) => {
        if (err) {
          return ErrorResponse(res, 500, "Internal Server Error", err);
        }
        const selectQuery = `SELECT * FROM movies WHERE MovieID = ?`;
        db.query(selectQuery, [MovieID], (err, data) => {
          if (err) {
            return ErrorResponse(res, 500, "Internal Server Error", err);
          }
          SuccessResponse(res, 200, "Movie updated successfully", data[0]);
        });
      });
    }
  } catch (error) {
    ErrorResponse(res, 500, "Internal Server Error", error);
  }
};
module.exports = { getMovies, getMovieDetail, addMovie, editMovie };

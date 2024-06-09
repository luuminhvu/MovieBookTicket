/* eslint-disable eqeqeq */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Age from "../../components/common/Age18+";
import { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Movie = () => {
  const { movies } = useSelector((state) => state.movie);
  const [showMovies, setShowMovies] = useState("nowShowing");
  const { t } = useTranslation();
  return (
    <>
      <div className="mt-15">
        <div className="w-screen">
          <div className="flex justify-center w-2/4 mx-auto border-b-2 border-black">
            <button
              onClick={() => setShowMovies("comingSoon")}
              className={`m-2 px-4 py-2 text-black focus:outline-none uppercase relative ${
                showMovies === "comingSoon" && "active"
              }`}
            >
              <span className="text-2xl">{t("comingSoon")}</span>
              {showMovies === "comingSoon" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transition-transform"></div>
              )}
            </button>
            <button
              onClick={() => setShowMovies("nowShowing")}
              className={`m-2 px-4 py-2 text-black focus:outline-none uppercase relative ${
                showMovies === "nowShowing" && "active"
              }`}
            >
              <span className="text-2xl">{t("nowShowing")}</span>
              {showMovies === "nowShowing" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 transition-transform"></div>
              )}
            </button>
          </div>
        </div>

        <div className="mx-auto sm:w-full md:w-3/4 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-5">
          {movies.length > 0 &&
            movies
              .filter((movie) => {
                if (showMovies === "comingSoon") {
                  return movie.Upcoming === 1;
                } else if (showMovies === "nowShowing") {
                  return movie.Active === 1;
                }
                return false;
              })
              .map((movie, index) => (
                <div key={index} className="flex flex-col relative">
                  <div className="relative">
                    <img
                      src={movie.Poster}
                      alt="phim"
                      className="rounded-3xl sm:w-full sm:max-w-sm md:max-w-none"
                    />
                  </div>

                  <Link
                    to={`/movie/${movie.MovieID}`}
                    className="text-sm mt-2 text-[#337ab7] font-bold cursor-pointer hover:underline"
                  >
                    {movie.Name}
                  </Link>
                  <h2 className="text-xs mt-2 font-bold">
                    {t("genres")}:
                    <span className="text-xs font-thin"> {movie.Genres}</span>
                  </h2>
                  <h2 className="text-sm mt-2 font-bold">
                    {t("runningTime")}:
                    <span className="text-sm font-thin"> {movie.Duration}</span>
                    <span className="text-sm font-thin"> {t("minutes")}</span>
                  </h2>
                  <h2 className="text-sm mt-2 font-bold">
                    {t("startDate")}:
                    <span className="text-sm font-thin">
                      {" "}
                      {dayjs(movie.ReleaseDate).format("DD/MM/YYYY")}
                    </span>
                  </h2>

                  {movie.Age == 18
                    ? Age({ Age: 18 })
                    : movie.Age == 16
                    ? Age({ Age: 16 })
                    : Age({ Age: 13 })}
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Movie;

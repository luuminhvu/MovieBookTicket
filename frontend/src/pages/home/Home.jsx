/* eslint-disable eqeqeq */
import SwiperCarousel from "../../components/common/Swiper";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TypewriterSpinner from "../../components/common/TypewriterSpinner";
import Age from "../../components/common/Age18+";
import Play from "../../components/icons/Play";
import Player from "../../components/common/ReactPlayer";
import { Link } from "react-router-dom";

const Home = () => {
  const { movies, status } = useSelector((state) => state.movie);
  const [isOpen, setIsOpen] = useState(false);
  const [movieTrailer, setMovieTrailer] = useState("");
  const handlePlay = (trailerUrl) => {
    setIsOpen(true);
    setMovieTrailer(trailerUrl);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {status === "loading" ? (
        <TypewriterSpinner />
      ) : (
        <>
          <SwiperCarousel />
          <div className="mt-15">
            <div className="w-screen">
              <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center border-b-2 w-2/4 mx-auto border-black">
                PHIM ĐANG CHIẾU
              </h1>
            </div>
            {isOpen ? (
              <Player handleClose={handleClose} movie={movieTrailer} />
            ) : null}
            <div className="mx-auto sm:w-full md:w-3/4 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-5">
              {movies.length > 0 &&
                movies
                  .filter((movie) => movie.Active == 1)
                  .map((movie, index) => (
                    <div key={index} className="flex flex-col relative">
                      <div className="relative">
                        <img
                          src={movie.Poster}
                          alt="phim"
                          className="rounded-3xl sm:w-full sm:max-w-sm md:max-w-none"
                        />
                        <div
                          className="absolute
                     inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor:pointer"
                          onClick={() => handlePlay(movie.Trailer)}
                        >
                          <Play />
                        </div>
                      </div>

                      <Link
                        to={`/movie/${movie.MovieID}`}
                        className="text-sm mt-2 text-[#337ab7] font-bold cursor-pointer hover:underline"
                      >
                        {movie.Name}
                      </Link>
                      <h2 className="text-sm mt-2 font-bold">
                        Thể loại:
                        <span className="text-xs font-thin">
                          {" "}
                          {movie.Genres}
                        </span>
                      </h2>
                      <h2 className="text-sm mt-2 font-bold">
                        Thời lượng:
                        <span className="text-sm font-thin">
                          {" "}
                          {movie.Duration}
                        </span>
                        <span className="text-sm font-thin"> phút</span>
                      </h2>
                      <Link
                        to={`/movie/bookings/${movie.MovieID}`}
                        className="btn btn-primary block text-center mt-5 text-white text-tranform: uppercase bg-sky-600 hover:bg-sky-700 p-2 rounded-3xl"
                      >
                        Mua vé
                      </Link>
                      {movie.Age == 18
                        ? Age({ Age: 18 })
                        : movie.Age == 16
                        ? Age({ Age: 16 })
                        : Age({ Age: 13 })}
                    </div>
                  ))}
            </div>
            <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center border-b-2 w-2/4 mx-auto border-black">
              PHIM SẮP CHIẾU
            </h1>
            <div className="mx-auto sm:w-full md:w-3/4 p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-5">
              {movies.length > 0 &&
                movies
                  .filter((movie) => movie.Upcoming == 1)
                  .map((movie, index) => (
                    <div key={index} className="flex flex-col relative">
                      <div className="relative">
                        <img
                          src={movie.Poster}
                          alt="phim"
                          className="rounded-3xl sm:w-full sm:max-w-sm md:max-w-none"
                        />
                        <div
                          className="absolute
                     inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor:pointer"
                          onClick={() => handlePlay(movie.Trailer)}
                        >
                          <Play />
                        </div>
                      </div>

                      <Link
                        to={`/movie/${movie.MovieID}`}
                        className="text-sm mt-2 text-[#337ab7] font-bold cursor-pointer hover:underline"
                      >
                        {movie.Name}
                      </Link>
                      <h2 className="text-sm mt-2 font-bold">
                        Thể loại:
                        <span className="text-xs font-thin">
                          {" "}
                          {movie.Genres}
                        </span>
                      </h2>
                      <h2 className="text-sm mt-2 font-bold">
                        Thời lượng:
                        <span className="text-sm font-thin">
                          {" "}
                          {movie.Duration}
                        </span>
                        <span className="text-sm font-thin"> phút</span>
                      </h2>
                      <Link
                        to={`/movie/bookings/${movie.MovieID}`}
                        className="btn btn-primary block text-center mt-5 text-white text-tranform: uppercase bg-sky-600 hover:bg-sky-700 p-2 rounded-3xl"
                      >
                        Mua vé
                      </Link>
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
      )}
    </>
  );
};
export default Home;

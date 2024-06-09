import { Link, useParams } from "react-router-dom";
import StarFill from "../../components/icons/StarFill";
import StarNoFill from "../../components/icons/StarNoFill";
import FacebookIconPlus from "../../components/icons/FacebookPlus";
import Twitter from "../../components/icons/Twitter";
import Message from "../../components/icons/Message";
import { useEffect, useState } from "react";
import { getDetailMovie } from "../../services/function";
import dayjs from "dayjs";
import Age from "../../components/common/Age18+";
import Player from "../../components/common/ReactPlayer";
import TypewriterSpinner from "../../components/common/TypewriterSpinner";
import { useTranslation } from "react-i18next";
const Detail = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [movieTrailer, setMovieTrailer] = useState("");
  const { t } = useTranslation();
  const handlePlay = (trailerUrl) => {
    setIsOpen(true);
    setMovieTrailer(trailerUrl);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDetailMovie(params.id);
        setMovie(response[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);
  return (
    <>
      {loading ? (
        <TypewriterSpinner />
      ) : (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container py-24 mx-auto">
            <div className="lg:w-full flex flex-wrap sm: px-5 border-b-2 border-gray-200">
              <div className="lg:w-1/4 w-full md:w-1/3 sm:w-full sm:mb-10 lg:mb-0 relative mr-0">
                <img
                  alt="ecommerce"
                  className="object-cover object-center rounded-2xl lg:w-full w-full h-auto mx-auto"
                  src={movie.Poster}
                />
                {movie.Age === String(18)
                  ? Age({ Age: 18 })
                  : movie.Age === String(16)
                  ? Age({ Age: 16 })
                  : Age({ Age: 13 })}
              </div>

              <div className="lg:w-3/4 w-full lg:pl-10 lg:py-6 md:w-2/3 md:pl-10 md:py-6 sm:w-full sm:pl-0 sm:py-6">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {movie.Name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarNoFill />
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <Link className="text-gray-500">
                      <FacebookIconPlus />
                    </Link>
                    <Link className="ml-2 text-gray-500">
                      <Twitter />
                    </Link>
                    <Link className="ml-2 text-gray-500">
                      <Message />
                    </Link>
                  </span>
                </div>
                <p className="leading-relaxed text-lg">{movie.Description}</p>
                <div className="mt-6 pb-5 border-gray-200 mb-5">
                  <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                    <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                      <span className="font-bold uppercase">
                        {t("director")} :
                      </span>
                    </div>
                    <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                      <span>{movie.Directors}</span>
                    </div>
                  </div>
                  <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                    <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                      <span className="font-bold uppercase">
                        {t("runningTime")} :
                      </span>
                    </div>
                    <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                      <span>
                        {movie.Duration} {t("minutes")}
                      </span>
                    </div>
                  </div>
                  <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                    <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                      <span className="font-bold uppercase">
                        {t("genres")} :
                      </span>
                    </div>
                    <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                      <span>{movie.Genres}</span>
                    </div>
                  </div>
                  <div className="lg:flex lg:flex-row lg:items-start lg:py-1 lg:text-lg md:flex md:flex-row md:items-start md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                    <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                      <span className="font-bold uppercase">{t("cast")} :</span>
                    </div>
                    <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                      <span>{movie.Actors}</span>
                    </div>
                  </div>
                  <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                    <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                      <span className="font-bold uppercase">
                        {t("language")} :
                      </span>
                    </div>
                    <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                      <span>{movie.Language}</span>
                    </div>
                  </div>
                  <div className="lg:flex lg:flex-row lg:items-center lg:py-1 lg:text-lg md:flex md:flex-row md:items-center md:py-1 md:text-lg sm:flex sm:flex-row sm:items-start sm:py-1 sm:text-sm">
                    <div className="lg:w-2/5 md:w-2/5 sm:w-2/5">
                      <span className="font-bold uppercase">
                        {t("startDate")} :
                      </span>
                    </div>
                    <div className="lg:w-4/5 md:w-3/5 sm:w-4/5">
                      <span>
                        {dayjs(movie.ReleaseDate).format("DD/MM/YYYY")}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/movie/bookings/${movie.MovieID}`}
                    className="bg-red-500 uppercase hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg border-2 border-red-500 hover:border-transparent mt-5 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  >
                    {t("booking")}
                  </Link>
                  <button
                    onClick={() => handlePlay(movie.Trailer)}
                    className="bg-gray-500 uppercase hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg border-2 border-gray-500 hover:border-transparent ml-5 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  >
                    Trailer
                  </button>
                </div>
                {isOpen ? (
                  <Player handleClose={handleClose} movie={movieTrailer} />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Detail;

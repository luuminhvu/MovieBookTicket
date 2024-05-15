import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNews } from "../../stores/newsSlice";
import { setLoading } from "../../stores/loadingSlice";
import { useEffect } from "react";
import dayjs from "dayjs";
const News = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading(true));
      try {
        await dispatch(getNews());
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchNews();
  }, [dispatch]);

  return (
    <>
      <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div class="border-b mb-5 flex justify-between text-sm">
          <div class="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
            <Link href="#" class="font-semibold inline-block">
              HOT NEWS
            </Link>
          </div>
          <Link href="#">See All</Link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {news.map((item, key) => (
            <div class="rounded overflow-hidden shadow-lg flex flex-col">
              <Link href="#"></Link>
              <div class="relative">
                <Link href="#">
                  <img
                    class="w-full"
                    src={item.Image}
                    alt="Sunset in the mountains"
                  />
                  <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                </Link>
                <a href="#!">
                  <div class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                    {item.Category}
                  </div>
                </a>
              </div>
              <div class="px-6 py-4 mb-auto">
                <Link
                  href="#"
                  class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
                >
                  {item.Title}
                </Link>
                <p class="text-gray-500 text-sm">{item.Content}</p>
              </div>
              <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span
                  href="#"
                  class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                >
                  <span class="ml-1">
                    {dayjs(item.PublicDate).format("DD/MM/YYYY")}
                  </span>
                </span>

                <span
                  href="#"
                  class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                >
                  <svg
                    class="h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                  <span class="ml-1">{item.Author}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;

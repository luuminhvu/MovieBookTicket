import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { setLoading } from "../../stores/loadingSlice";
import { getNewsById } from "../../stores/newsSlice";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";

const NewsDetails = () => {
  const { id: NewsID } = useParams();
  const [newsDetails, setNewsDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoading(true));
      try {
        const res = await dispatch(getNewsById(NewsID));
        setNewsDetails(res.payload[0]);
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
      }
    };
    fetchNews();
  }, [dispatch, NewsID]);

  return (
    <>
      {newsDetails.Content && (
        <main className="pt-8 pb-16 antialiased">
          <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <h1 className="text-4xl font-bold text-gray-900">
              {newsDetails.Title}
            </h1>
            <p className="text-gray-600 mt-2">
              Ngày đăng: {dayjs(newsDetails.PublicDate).format("DD/MM/YYYY")}
            </p>
            <img
              src={newsDetails.Image}
              alt="Placeholder"
              className="w-96 h-50 object-fit rounded mt-5"
            />
            <p className="text-gray-700 mt-5">{parse(newsDetails.Content)}</p>
            <div className="mt-6">
              <p className="italic text-xl">Tác giả: {newsDetails.Author}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default NewsDetails;

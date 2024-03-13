import React, { useEffect, useState } from "react";
import Booking from "../../components/common/Booking";
import DateSelector from "../../components/common/DatePicker";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { getShowTimeMovie } from "../../services/function";
import { setLoading } from "../../stores/loadingSlice";
import Search from "../../components/icons/Search";
const BookDate = () => {
  const id = useParams().id;
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [showTime, setShowTime] = useState([]);
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate.format("YYYY-MM-DD"));
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const showTime = await getShowTimeMovie(id, date);
        setShowTime(showTime);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, date]);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center border-b-2 border-gray-500">
          <Booking />
          <DateSelector onDateChange={handleDateChange} />
        </div>
        <div className="flex flex-wrap m-4">
          {showTime.length === 0 ? (
            <div className="w-full text-center">
              <p className="text-gray-600 mb-6">
                Xin lỗi, không có suất chiếu vào ngày này, hãy chọn một ngày
                khác.
              </p>
              <Search />
            </div>
          ) : (
            showTime.map((time, index) => (
              <div key={index} className="w-full mb-4">
                <h1 className="text-2xl text-gray-600 p-2 mb-4">
                  {time.CinemaName}
                </h1>
                <div className="flex flex-wrap">
                  {time.Showtimes.map((showtime, idx) => (
                    <button key={idx} className="mr-4 mb-4">
                      <span className="text-xl text-gray-900 px-4 py-2 border-2 border-gray-500 rounded-lg hover:border-gray-800">
                        {showtime.StartTime.slice(0, 5)}
                      </span>
                    </button>
                  ))}
                </div>
                {index !== showTime.length - 1 && (
                  <hr className="border-b-2 border-gray-500 mt-4" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BookDate;

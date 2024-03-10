import React, { useState } from "react";
import dayjs from "dayjs";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderDateButtons = () => {
    const dateArray = Array.from({ length: 4 }, (_, index) =>
      dayjs().add(index, "day").format("YYYY-MM-DD")
    );

    return dateArray.map((date, index) => (
      <button
        key={index}
        className={`px-4 py-2 rounded-lg focus:outline-none ${
          selectedDate.format("YYYY-MM-DD") === date
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => handleDateChange(dayjs(date))}
      >
        {dayjs(date).format("DD/MM/YYYY")}
      </button>
    ));
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      {renderDateButtons()}
    </div>
  );
};

export default DateSelector;

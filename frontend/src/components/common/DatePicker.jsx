import React, { useState } from "react";
import dayjs from "dayjs";

const DateSelector = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const currentDate = dayjs();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dateArray = Array.from({ length: 7 }, (_, index) =>
    currentDate.clone().add(index, "day")
  );

  const handleDateChange = (index) => {
    setSelectedDateIndex(index);
    console.log(dateArray[index].format("YYYY-MM-DD")); // Log ngày được chọn
  };

  const renderDateButtons = () => {
    return dateArray.map((date, index) => {
      const isSelected = index === selectedDateIndex;
      const buttonClass = `flex group ${
        isSelected
          ? "bg-purple-600 shadow-lg dark-shadow"
          : "bg-white shadow-md"
      } hover:bg-purple-500 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-64`;

      return (
        <div
          key={index}
          className={buttonClass}
          onClick={() => handleDateChange(index)}
        >
          <div className="flex items-center px-4 py-4">
            <div className="text-center">
              <p
                className={`text-sm transition-all duration-300 ${
                  isSelected
                    ? "text-gray-100"
                    : "text-gray-900 group-hover:text-gray-100"
                }`}
              >
                {daysOfWeek[date.day()]}
              </p>
              <p
                className={`mt-3 transition-all duration-300 ${
                  isSelected
                    ? "font-bold text-gray-100"
                    : "text-gray-900 group-hover:text-gray-100"
                }`}
              >
                {date.format("DD")}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      {renderDateButtons()}
    </div>
  );
};

export default DateSelector;

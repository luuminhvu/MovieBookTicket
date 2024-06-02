const Notice = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center mt-8 border-2 border-gray-500 p-4 rounded-lg bg-gray-300
        "
      >
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border rounded border-gray-400"></div>
            <span className="ml-2">Ghế thường</span>
          </div>
          <div className="flex items-center justify-center ml-4">
            <div className="w-8 h-8 border rounded bg-green-500"></div>
            <span className="ml-2">Ghế đã chọn</span>
          </div>
          <div className="flex items-center justify-center ml-4">
            <div className="w-8 h-8 border rounded border-blue-600"></div>
            <span className="ml-2">Ghế VIP</span>
          </div>
          <div className="flex items-center justify-center ml-4">
            <div className="w-8 h-8 border rounded bg-red-400"></div>
            <span className="ml-2">Ghế đã có người đặt</span>
          </div>
          <div className="flex items-center justify-center ml-4">
            <div className="w-8 h-8 border rounded bg-yellow-400"></div>
            <span className="ml-2">Ghế không thể chọn</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;

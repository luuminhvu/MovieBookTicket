import Typewriter from "typewriter-effect";

const TypewriterSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin-slow rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-700">
          Đang lấy dữ liệu...
        </p>
        <h1 className="text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600">
          <Typewriter
            options={{
              strings: ["Vui lòng đợi trong giây lát"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
      </div>
    </div>
  );
};

export default TypewriterSpinner;

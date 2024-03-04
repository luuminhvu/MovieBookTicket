const Age = ({ Age }) => {
  return (
    <div
      className={`absolute top-3 left-4 text-white p-1 rounded-full ${
        Age === 18
          ? "bg-pink-500"
          : Age === 16
          ? "bg-yellow-500"
          : "bg-blue-500"
      }`}
    >
      T{Age}
    </div>
  );
};

export default Age;

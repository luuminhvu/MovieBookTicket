import NotFoundIcon from "../../components/icons/NotFound";
const NotFound = () => {
  return (
    <>
      <div className="text-center h-[80vh] flex flex-col justify-center items-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you're lost.
        </p>
        <div className="animate-bounce">
          <NotFoundIcon />
        </div>
        <p className="mt-4 text-gray-600">
          Let's get you back{" "}
          <a href="/" className="text-blue-500">
            home
          </a>
        </p>
      </div>
    </>
  );
};
export default NotFound;

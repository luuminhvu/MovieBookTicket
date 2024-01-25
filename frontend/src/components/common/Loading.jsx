import LoadingIcon from "../icons/Loading";

const LoadingLayout = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <div class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-75">
          <LoadingIcon />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingLayout;

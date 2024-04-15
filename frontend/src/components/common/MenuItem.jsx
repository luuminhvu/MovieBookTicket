import { useNavigate } from "react-router-dom";

const MenuItem = ({ text, icon: Icon, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin/${path}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3"
      >
        {Icon && <Icon />}
        <div>{text}</div>
      </div>
    </>
  );
};

export default MenuItem;

import EditIcon from "../../../components/icons/Edit";
import DeleteIcon from "../../../components/icons/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../stores/loadingSlice";
import { deleteNews } from "../../../stores/newsSlice";
const ActionCellNews = ({ row }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEditClick = (row) => {
    navigate(`/admin/news/${row.NewsID}`);
  };
  const handleDeleteClick = async (row) => {
    dispatch(setLoading(true));
    try {
      await dispatch(deleteNews(row.NewsID));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleEditClick(row)}
        className="bg-blue-500 mr-2 p-2 text-white rounded-md hover:bg-blue-700"
      >
        <EditIcon />
      </button>
      <button
        onClick={() => {
          handleDeleteClick(row);
        }}
        className="bg-red-500 p-2 text-white rounded-md hover:bg-red-700"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};
export default ActionCellNews;

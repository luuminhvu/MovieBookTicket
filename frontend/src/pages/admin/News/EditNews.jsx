/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { updateNews } from "../../../stores/newsSlice";
import { setLoading } from "../../../stores/loadingSlice";

const EditNews = () => {
  const { id: NewsID } = useParams();
  const navigate = useNavigate();
  const news = useSelector((state) => state.news.news);
  const newsEdit = news.find((item) => item.NewsID == NewsID);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(newsEdit ? newsEdit.Title : "");
  const [content, setContent] = useState(newsEdit ? newsEdit.Content : "");
  const [author, setAuthor] = useState(newsEdit ? newsEdit.Author : "");
  const [poster, setPoster] = useState(newsEdit ? newsEdit.Image : "");
  const [isChecked, setIsChecked] = useState(
    newsEdit ? (newsEdit.Active == 1 ? true : false) : true
  );

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleUploadPoster = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image")) {
        transformFile(file);
      } else {
        alert(
          "File không đúng định dạng, vui lòng chọn file ảnh có đuôi .jpg, .png, .jpeg"
        );
      }
    }
  };

  const transformFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPoster(reader.result);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (!newsEdit) {
      navigate("/admin/news");
    }
  }, [newsEdit, navigate]);
  const handleSave = async () => {
    const data = {
      NewsID,
      Title: title,
      Content: content,
      Image: poster,
      Active: isChecked ? 1 : 0,
    };
    dispatch(setLoading(true));
    try {
      await dispatch(updateNews(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-xl text-yellow-500">Chỉnh sửa tin tức</h1>
      </div>

      <div>
        <label>Tiêu đề</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Tác giả</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <label>Poster</label>
        <input
          type="file"
          onChange={handleUploadPoster}
          className="border p-2 w-full"
        />
        {poster && <img src={poster} alt="poster" className="w-40 h-40 mt-2" />}
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          height: "500px", // Thiết lập chiều cao tối đa cho CKEditor
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />

      <div>
        <label className="relative inline-flex cursor-pointer items-center mt-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="peer sr-only"
          />
          <div className="peer flex h-8 items-center gap-4 rounded-full bg-orange-600 px-3 after:absolute after:left-1 after: after:h-6 after:w-16 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-checked:bg-stone-600 peer-checked:after:translate-x-full peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700 text-sm text-white">
            <span>Deactive</span>
            <span>Active</span>
          </div>
        </label>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Lưu
      </button>
    </div>
  );
};

export default EditNews;

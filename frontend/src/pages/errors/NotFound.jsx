import NotFoundIcon from "../../components/icons/NotFound";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-center h-[80vh] flex flex-col justify-center items-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">{t("errorNotFound")}</p>
        <div className="animate-bounce-top">
          <NotFoundIcon />
        </div>
        <p className="mt-4 text-gray-600">
          {t("backtoHome")}{" "}
          <a href="/" className="text-blue-500">
            {t("home")}
          </a>
        </p>
      </div>
    </>
  );
};
export default NotFound;

import { useTranslation } from "react-i18next";

const Booking = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-4xl font-extrabold text-center mt-10 mb-8 text-purple-800">
        {t("chooseDate")}
      </h1>
    </>
  );
};

export default Booking;

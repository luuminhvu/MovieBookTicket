import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FailedCpn = () => {
  const { t } = useTranslation();
  return (
    <>
      <div class="bg-gray-100 h-full">
        <div class="bg-white p-6 md:mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-emoji-tear text-orange-600 w-16 h-16 mx-auto my-6"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M6.831 11.43A3.1 3.1 0 0 1 8 11.196c.916 0 1.607.408 2.25.826.212.138.424-.069.282-.277-.564-.83-1.558-2.049-2.532-2.049-.53 0-1.066.361-1.536.824q.126.27.232.535.069.174.135.373ZM6 11.333C6 12.253 5.328 13 4.5 13S3 12.254 3 11.333c0-.706.882-2.29 1.294-2.99a.238.238 0 0 1 .412 0c.412.7 1.294 2.284 1.294 2.99M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5m-1.5-3A.5.5 0 0 1 10 3c1.162 0 2.35.584 2.947 1.776a.5.5 0 1 1-.894.448C11.649 4.416 10.838 4 10 4a.5.5 0 0 1-.5-.5M7 3.5a.5.5 0 0 0-.5-.5c-1.162 0-2.35.584-2.947 1.776a.5.5 0 1 0 .894.448C4.851 4.416 5.662 4 6.5 4a.5.5 0 0 0 .5-.5" />
          </svg>
          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              {t("paymentFailed")}
            </h3>
            <p class="text-gray-600 my-2">{t("paymentFailedMessage")}</p>
            <p> {t("pleaseTryAgain")} </p>
            <div class="py-10 text-center">
              <Link
                to="/"
                class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                {t("home")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FailedCpn;

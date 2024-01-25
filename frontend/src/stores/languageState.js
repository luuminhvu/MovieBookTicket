import { useTranslation } from "react-i18next";

const useLanguageState = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return { currentLanguage };
};

export default useLanguageState;

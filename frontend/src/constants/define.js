export const generateNavLinks = (t) => {
  return [
    {
      name: t("movieSchedule"),
      link: "/show",
    },
    {
      name: t("movie"),
      link: "/film",
    },
    {
      name: t("theater"),
      link: "/cinema",
    },
    {
      name: t("news"),
      link: "/news",
    },
    {
      name: t("price"),
      link: "/price",
    },
    {
      name: t("about"),
      link: "/about",
    },
  ];
};

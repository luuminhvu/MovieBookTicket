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
    // {
    //   name: t("price"),
    //   link: "/price",
    // },
    {
      name: t("about"),
      link: "/about",
    },
  ];
};
export const AVATAR_DEFAULT =
  "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg";

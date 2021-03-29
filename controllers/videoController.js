export const home = (req, res) => res.render("home", { pageTitle: "Home" });
export const search = (req, res) => {
  const {
    query: { search_query },
  } = req;
  res.render("search", { search_query });
};
export const videoDetail = (req, res) => res.render("videoDetail");
export const uploadVideo = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("videoDetail");
export const deleteVideo = (req, res) => res.render("videoDetail");

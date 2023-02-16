import Video from "../models/video";
/*same Code
const handleSearch = (error, videos) => {
  console.log("error", error);
  console.log("videos", videos);
};
*/
//callback function
//Video.find({}, (error, videos) => {});
/*
video.find({}, (error, videos) => {
if(error){
return res.render("server-error")
}
return res.render("home")
});

*/
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});

    return res.render("home", { pageTitle: "Home", videos: [] });
  } catch {
    return res.render("server-error");
  }
};

export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", { pageTitle: `Watch` });
};
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("delete Video");
};

export const getEdit = (req, res) => {
  const { id } = req.params;

  return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};

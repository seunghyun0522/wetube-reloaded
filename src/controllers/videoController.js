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
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
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
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      reating: 0,
    },
  });
  console.log(video);
  return res.redirect("/");
};

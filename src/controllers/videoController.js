export const trending = (req, res) => res.send("Home Page Videos");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("delete Video");
};

export const edit = (req, res) => {
  console.log(req.params);
  return res.send("Edit Video");
};
export const search = (req, res) => res.send("search videos");
export const see = (req, res) => {
  console.log(req.params);
  res.send("see videos");
};
export const upload = (req, res) => res.send("upload videos");

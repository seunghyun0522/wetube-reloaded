const fakeUser = {
  username: "seung",
  loggedIn: true,
};

export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", fakeUser });
export const see = (req, res) => res.render("watch");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  res.send("delete Video");
};

export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("search videos");

export const upload = (req, res) => res.send("upload videos");

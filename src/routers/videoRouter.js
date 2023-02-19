import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  deleteVideo,
  upload,
  getUpload,
  postUpload,
} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
//videoRouter.get("/upload", getUpload);
//videoRouter.post("/uploade", postUpload);
videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;

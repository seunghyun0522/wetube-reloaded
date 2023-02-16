import express from "express";
import { join, logout, login } from "../controllers/userController";
import { home } from "../controllers/videoController";
const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

globalRouter.get("/logout", logout);
export default globalRouter;

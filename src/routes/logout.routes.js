import { logout } from "../controllers/logout.controller.js";
import express from "express";
const logoutRouter = express.Router();

logoutRouter.route("/logout").post(logout);

export default logoutRouter;
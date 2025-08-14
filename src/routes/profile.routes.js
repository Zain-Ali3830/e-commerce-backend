import express from 'express';
import { setProfile } from '../controllers/profile.controller.js';
// import { profileMiddleware } from '../middleware/profile.middleware.js';
import { getProfile } from '../controllers/profile.controller.js';
const profileRouter=express.Router();

profileRouter.route("/setprofile").put(setProfile);
profileRouter.route("/getprofile").get(getProfile);
export default profileRouter;
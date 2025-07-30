import express from 'express';
import { setProfile } from '../controllers/profile.controller.js';
import { profileMiddleware } from '../middleware/profile.middleware.js';
const profileRouter=express.Router();

profileRouter.route("/setprofile/:id").put(profileMiddleware,setProfile);
export default profileRouter;
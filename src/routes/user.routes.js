import validateUser from "../middleware/user.middleware.js";
import express from 'express';
import { signup } from "../controllers/user.controllers.js";
import { login } from "../controllers/user.controllers.js";
import validateAuth from "../middleware/validateAuth.middleware.js";
import { deleteUser } from "../controllers/user.controllers.js";
import { getUsers } from "../controllers/user.controllers.js";
const router = express.Router();

router.post("/signup", validateUser, signup);
router.post("/login", login);
router.get("/me", validateAuth, (req, res) => res.json('Welcome', req.user));
router.route('/deleteuser').delete(deleteUser);
router.route('/getusers').get(getUsers);
export default router;
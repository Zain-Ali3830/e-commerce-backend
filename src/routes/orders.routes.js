import express from "express";
const orderRouter = express.Router();
import { addOrder } from "../controllers/order.controller.js";
import { cancelOrder } from "../controllers/order.controller.js";
import { getOrders } from "../controllers/order.controller.js";
orderRouter.route("/addorder").post(addOrder);
orderRouter.route("/cancelorder/:id").delete(cancelOrder);
orderRouter.route("/getorders").get(getOrders);
export default orderRouter;

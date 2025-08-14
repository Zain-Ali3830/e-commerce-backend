import express from "express";
import cors from "cors";
import router from "./routes/user.routes.js";
import productsRouter from "./routes/product.routes.js";
import orderRouter from "./routes/orders.routes.js";
import profileRouter from "./routes/profile.routes.js";
import logoutRouter from "./routes/logout.routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json());

app.use("/api/users", router);
app.use("/api/products", productsRouter);
app.use("/api/orders", orderRouter);
app.use("/api/profile", profileRouter);
app.use("/api", logoutRouter);
export default app;



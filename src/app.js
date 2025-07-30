import express from "express";
import cors from "cors";
import router from "./routes/user.routes.js";
import productsRouter from "./routes/product.routes.js";
import orderRouter from "./routes/orders.routes.js";
import profileRouter from "./routes/profile.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", router);
app.use("/api/products", productsRouter);
app.use("/api/orders", orderRouter);
app.use("/api/profile", profileRouter);
export default app;

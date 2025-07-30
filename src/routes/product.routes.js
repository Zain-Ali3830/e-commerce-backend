import express from "express";
import { upload } from "../middleware/multer.js";
import { addProducts } from "../controllers/products.controller.js";
import { getProducts } from "../controllers/products.controller.js";
import { deleteProduct } from "../controllers/products.controller.js";
import { searchProduct } from "../controllers/products.controller.js";
import { addToCart } from "../controllers/products.controller.js";
import { searchCart } from "../controllers/products.controller.js";
import { deleteFromCart } from "../controllers/products.controller.js";
import { addToWishlist } from "../controllers/products.controller.js";
import { getWishlist } from "../controllers/products.controller.js";
import { searchWishlist } from "../controllers/products.controller.js";
import { deleteFromWishlist } from "../controllers/products.controller.js";
const productsRouter = express.Router();

productsRouter
  .route("/addproducts")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), addProducts);
productsRouter.route("/getproducts").get(getProducts);
productsRouter.route("/deleteproducts/:id").delete(deleteProduct);
productsRouter.route("/searchproducts/:name").get(searchProduct);
productsRouter.route("/addtocart/:id").post(addToCart);
productsRouter.route("/searchcart/:id").get(searchCart);
productsRouter.route("/deletecart/:id").delete(deleteFromCart);
productsRouter.route("/addtowishlist/:id").post(addToWishlist);
productsRouter.route("/getwishlist").get(getWishlist);
productsRouter.route("/searchwishlist/:id").get(searchWishlist);
productsRouter.route("/deletewishlist/:id").delete(deleteFromWishlist);
export default productsRouter;

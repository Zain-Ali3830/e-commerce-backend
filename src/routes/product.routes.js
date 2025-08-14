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
import { getCart } from "../controllers/products.controller.js";
const productsRouter = express.Router();

productsRouter
  .route("/addproducts")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), addProducts);
productsRouter.route("/getproducts").get(getProducts);
productsRouter.route("/deleteproducts/:id").delete(deleteProduct);
productsRouter.route("/searchproducts").get(searchProduct);
productsRouter.route("/addtocart").post(addToCart);
productsRouter.route("/searchcart ").get(searchCart);
productsRouter.route("/deletecart").delete(deleteFromCart);
productsRouter.route("/addtowishlist").post(addToWishlist);
productsRouter.route("/getwishlist").get(getWishlist);
productsRouter.route("/searchwishlist/:id").get(searchWishlist);
productsRouter.route("/deletewishlist").delete(deleteFromWishlist);
productsRouter.route("/getcart").get(getCart);
export default productsRouter;

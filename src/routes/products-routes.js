import { Router } from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/product-controller.js";

const productRouter = Router();

productRouter.post("/create-products", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

export default productRouter;

import { Router } from "express";
import { 
    createProduct, 
    deleteProductById, 
    getAllProducts, 
    getProductById, 
    updateProductById 
} from "../controllers/product-controller.js";

const productRouter = Router();

productRouter.post("/create-products", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProductById);
productRouter.patch("/:id", updateProductById);

export default productRouter;

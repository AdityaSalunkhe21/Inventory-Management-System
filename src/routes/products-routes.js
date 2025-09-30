import { Router } from "express";
import { 
    createProduct, 
    deleteProductById, 
    getAllProducts, 
    getProductById, 
    updateProductById,
    increaseStockQuantity,
    decreaseStockQuantity,
    getLowStockProducts
} from "../controllers/product-controller.js";

const productRouter = Router();

productRouter.post("/create-products", createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/low-stock", getLowStockProducts);
productRouter.get("/:id", getProductById);
productRouter.delete("/:id", deleteProductById);
productRouter.patch("/:id", updateProductById);
productRouter.patch("/:id/increase-stock", increaseStockQuantity);
productRouter.patch("/:id/decrease-stock", decreaseStockQuantity);

export default productRouter;

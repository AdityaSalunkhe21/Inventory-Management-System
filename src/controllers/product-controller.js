import { 
    createProductService, 
    deleteProductByIdService, 
    getAllProductsService, 
    getProductByIdService, 
    updateProductByIdService,
    increaseStockQuantityService,
    decreaseStockQuantityService,
    getLowStockProductsService
} from "../services/product-service.js";
import { ApiError } from "../utils/ApiError.js";

export const createProduct = async (req, res, next) => {
    try {
        const products = req.body;
        
        const productsArray = Array.isArray(products) ? products : [products];
        
        for (let i = 0; i < productsArray.length; i++) {
            const { name, description, stock_quantity, low_stock_threshold } = productsArray[i];
            
            if (!name || !description) {
                throw new ApiError(`Product ${i + 1}: Name and description are required`, 400);
            }
            
            if (typeof name !== "string" || name.trim().length === 0) {
                throw new ApiError(`Product ${i + 1}: Name must be a non-empty string`, 400);
            }
            
            if (stock_quantity !== undefined && (isNaN(Number(stock_quantity)) || Number(stock_quantity) < 0)) {
                throw new ApiError(`Product ${i + 1}: Invalid stock quantity`, 400);
            }

            if (low_stock_threshold !== undefined && (isNaN(Number(low_stock_threshold)) || Number(low_stock_threshold) < 0)) {
                throw new ApiError(`Product ${i + 1}: Invalid low_stock_threshold`, 400);
            }
        }
        
        await createProductService(productsArray);

        res.send("Product(s) created successfully");
    } catch (error) {
        next(error);
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProductsService();
        res.send(products);
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id !== undefined && (isNaN(Number(id)) || Number(id) < 0)) {
            throw new ApiError("Invalid product id", 400);
        }

        const product = await getProductByIdService(Number(id));
        res.send(product);
    } catch (error) {
        next(error);
    }
}

export const deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id !== undefined && (isNaN(Number(id)) || Number(id) < 0)) {
            throw new ApiError("Invalid product id", 400);
        }

        await deleteProductByIdService(Number(id));
        res.send("Product deleted successfully");
    } catch (error) {
        next(error);
    }
}

export const updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, low_stock_threshold } = req.body;

        if (id === undefined || isNaN(Number(id)) || Number(id) < 0) {
            throw new ApiError("Invalid product id", 400);
        }

        if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
            throw new ApiError("Name must be a non-empty string", 400);
        }

        if (description !== undefined && (typeof description !== "string" || description.trim().length === 0)) {
            throw new ApiError("Invalid description", 400);
        }

        if (
            low_stock_threshold !== undefined &&
            (isNaN(Number(low_stock_threshold)) || Number(low_stock_threshold) < 0)
        ) {
            throw new ApiError("Invalid low_stock_threshold", 400);
        }

        if (name === undefined && description === undefined && low_stock_threshold === undefined) {
            throw new ApiError("No fields to update", 400);
        }

        const updatedProduct = await updateProductByIdService(Number(id), {
            name,
            description,
            low_stock_threshold
        });

        res.send(updatedProduct);
    } catch (error) {
        next(error);
    }
}

export const increaseStockQuantity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const quantity = req.body?.quantity ? Number(req.body.quantity) : 1;

        if (id !== undefined && (isNaN(Number(id)) || Number(id) < 0)) {
            throw new ApiError("Invalid product id", 400);
        }

        if (quantity !== undefined && (isNaN(Number(quantity)) || Number(quantity) < 0)) {
            throw new ApiError("Invalid quantity", 400);
        }

        const product = await increaseStockQuantityService(Number(id), Number(quantity));
        res.send(product);
    } catch (error) {
        next(error);
    }
}

export const decreaseStockQuantity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const quantity = req.body?.quantity ? Number(req.body.quantity) : 1;

        if (id !== undefined && (isNaN(Number(id)) || Number(id) < 0)) {
            throw new ApiError("Invalid product id", 400);
        }

        if (quantity !== undefined && (isNaN(Number(quantity)) || Number(quantity) < 0)) {
            throw new ApiError("Invalid quantity", 400);
        }

        const product = await decreaseStockQuantityService(Number(id), Number(quantity));
        res.send(product);
    } catch (error) {
        next(error);
    }
}

export const getLowStockProducts = async (req, res, next) => {
    try {
        const products = await getLowStockProductsService();
        res.send(products);
    } catch (error) {
        next(error);
    }
}

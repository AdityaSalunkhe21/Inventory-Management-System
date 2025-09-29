import prisma from "../db.js";
import { ApiError } from "../utils/ApiError.js";

export const createProductService = async (products) => {
    try {
        const productsArray = Array.isArray(products) ? products : [products];
        
        const productsData = productsArray.map(product => ({
            name: product.name,
            description: product.description,
            stock_quantity: Number(product.stock_quantity),
            low_stock_threshold: Number(product.low_stock_threshold)
        }));

        await prisma.product.createMany({
            data: productsData
        });

    } catch (error) {
        console.error("Database error:", error);
        
        if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
            throw new ApiError("A product with this name already exists. Please choose a different name.", 409);
        }
        
        throw new ApiError(`Error creating products: ${error.message}`, 500);
    }
}

export const getAllProductsService = async () => {
    try {
        const products = await prisma.product.findMany();

        return products;
    } catch (error) {
        throw new ApiError("Error fetching products", 500);
    }
}

export const getProductByIdService = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        });

        if (!product) {
            throw new ApiError("Product not found", 404);
        }

        return product;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(`Error fetching product: ${error.message}`, 500);
    }
}

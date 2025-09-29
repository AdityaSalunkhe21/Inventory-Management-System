import express from "express";
import productRouter from "./routes/products-routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/products", productRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Inventory Management API",
        routes: [
            { method: "POST", path: "/products/create-products", description: "Create a new product" },
            { method: "GET", path: "/products/", description: "Get all products" },
            { method: "GET", path: "/products/:id", description: "Get product by ID" },
        ]
    });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;

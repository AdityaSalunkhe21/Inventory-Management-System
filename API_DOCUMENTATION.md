# Investment Management System - API Documentation

## Base URL
```
http://localhost:3000
```

## Content Type
All requests and responses use `application/json`.

---

## Endpoints

### 1. Root Endpoint

#### `GET /`
Get API information and available routes.

---

## Product Management Endpoints

### 2. Create Products

#### `POST /products/create-products`
Create one or multiple products.

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "stock_quantity": 100,
  "low_stock_threshold": 10
}
```

**Bulk Creation:**
```json
[
  {
    "name": "Product 1",
    "description": "Description 1",
    "stock_quantity": 50,
    "low_stock_threshold": 5
  },
  {
    "name": "Product 2",
    "description": "Description 2",
    "stock_quantity": 75,
    "low_stock_threshold": 8
  }
]
```

**Required Fields:**
- `name` (string): Product name (must be unique)
- `description` (string): Product description
- `stock_quantity` (number): Initial stock quantity (default: 0)
- `low_stock_threshold` (number): Low stock alert threshold (default: 0)

**Response:**
```
Product(s) created successfully
```

**Error Responses:**
- `400 Bad Request`: Missing required fields or invalid data
- `409 Conflict`: Product name already exists

---

### 3. Get All Products

#### `GET /products/`
Retrieve all products in the system.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "stock_quantity": 25,
    "low_stock_threshold": 5,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Mouse",
    "description": "Wireless mouse",
    "stock_quantity": 100,
    "low_stock_threshold": 10,
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
]
```

---

### 4. Get Product by ID

#### `GET /products/:id`
Retrieve a specific product by its ID.

**Parameters:**
- `id` (number): Product ID

**Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "stock_quantity": 25,
  "low_stock_threshold": 5,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid product ID
- `404 Not Found`: Product not found

---

### 5. Get Low Stock Products

#### `GET /products/low-stock`
Retrieve products where stock quantity is below the low stock threshold.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-performance laptop",
    "stock_quantity": 3,
    "low_stock_threshold": 5,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### 6. Update Product

#### `PATCH /products/:id`
Update product details (name, description, or low_stock_threshold).

**Parameters:**
- `id` (number): Product ID

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated description",
  "low_stock_threshold": 15
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Response:**
```json
{
  "id": 1,
  "name": "Updated Product Name",
  "description": "Updated description",
  "stock_quantity": 25,
  "low_stock_threshold": 15,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:45:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid product ID or data or No fields to update
- `404 Not Found`: Product not found
- `409 Conflict`: Product name already exists

---

### 7. Delete Product

#### `DELETE /products/:id`
Delete a product by its ID.

**Parameters:**
- `id` (number): Product ID

**Response:**
```
Product deleted successfully
```

**Error Responses:**
- `400 Bad Request`: Invalid product ID
- `404 Not Found`: Product not found

---

### 8. Increase Stock Quantity

#### `PATCH /products/:id/increase-stock`
Increase the stock quantity of a product.

**Parameters:**
- `id` (number): Product ID

**Request Body:**
```json
{
  "quantity": 10
}
```

**Note:** If no quantity is provided, defaults to 1.

**Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "stock_quantity": 35,
  "low_stock_threshold": 5,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid product ID or quantity
- `404 Not Found`: Product not found

---

### 9. Decrease Stock Quantity

#### `PATCH /products/:id/decrease-stock`
Decrease the stock quantity of a product.

**Parameters:**
- `id` (number): Product ID

**Request Body:**
```json
{
  "quantity": 5
}
```

**Note:** If no quantity is provided, defaults to 1. Cannot decrease below 0.

**Response:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "stock_quantity": 30,
  "low_stock_threshold": 5,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T12:05:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid product ID, quantity, or insufficient stock
- `404 Not Found`: Product not found

---

## Error Handling

### Error Response Format
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

### Common HTTP Status Codes
- `200 OK`: Successful request
- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource (e.g., product name already exists)
- `500 Internal Server Error`: Server error

---

## Data Models

### Product Model
```json
{
  "id": "number (auto-increment)",
  "name": "string (unique)",
  "description": "string",
  "stock_quantity": "number (default: 0)",
  "low_stock_threshold": "number (default: 0)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## Examples

### Creating a Product
```bash
curl -X POST http://localhost:3000/products/create-products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Noise-cancelling wireless headphones",
    "stock_quantity": 50,
    "low_stock_threshold": 10
  }'
```

### Getting All Products
```bash
curl -X GET http://localhost:3000/products/
```

### Updating Stock
```bash
curl -X PATCH http://localhost:3000/products/1/increase-stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 25}'
```

### Checking Low Stock Products
```bash
curl -X GET http://localhost:3000/products/low-stock
```

---

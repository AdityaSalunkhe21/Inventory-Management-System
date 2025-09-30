# Investment Management System

A RESTful API for managing products with stock tracking, low stock alerts, and automated stock management features. Built with Node.js, Express, and Prisma ORM with SQLite database.

## Features

- **Product Management**: Create, read, update, and delete products
- **Stock Tracking**: Monitor and update product stock quantities
- **Low Stock Alerts**: Identify products that are running low on stock
- **Bulk Operations**: Create multiple products at once
- **Input Validation**: Comprehensive validation for all endpoints
- **Error Handling**: Detailed error messages and proper HTTP status codes

## API Routes

### Products

- `POST /products/create-products` - Create one or multiple products
- `GET /products/` - Get all products
- `GET /products/low-stock` - Get products with quantity below low stock threshold
- `GET /products/:id` - Get a specific product by ID
- `DELETE /products/:id` - Delete a product by ID
- `PATCH /products/:id` - Update product details (name, description, low_stock_threshold)
- `PATCH /products/:id/increase-stock` - Increase product stock quantity
- `PATCH /products/:id/decrease-stock` - Decrease product stock quantity

### Root

- `GET /` - API information and available routes

### API Documentation

- **[Complete API Documentation](API_DOCUMENTATION.md)** - Detailed API reference with examples, request/response formats, and error codes.

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/AdityaSalunkhe21/Investment-Management-System.git
   cd Investment-Management-System
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   ```bash
   cp .env.example .env
   ```

   - Set the desired path for database file

4. **Set up the database**

   ```bash
   # Run database migrations
   npx prisma migrate deploy

   npx prisma db push
   ```

5. **Start the server**
   ```bash
   npm run start
   ```

The API will be available at `http://localhost:3000`

## Running Tests

The project uses Vitest for testing with Supertest for API testing.

### Run all tests

```bash
npm test
```

### Test Coverage

The test suite includes:

- Stock quantity increase/decrease operations
- Input validation for product IDs and quantities
- Error handling for invalid inputs
- Edge cases like insufficient stock scenarios

## Design Choices and Assumptions

### Stock Quantity Management

For the increase and decrease stock APIs (`/products/:id/increase-stock` and `/products/:id/decrease-stock`), the following design approach was implemented:

- **Default Quantity**: If no quantity is provided in the request body, the system defaults to increasing/decreasing by 1 unit
- **Custom Quantity**: If a quantity is provided in the request body, the system uses that specific amount
- **Validation**: All quantities must be positive numbers (≥ 0)
- **Stock Protection**: The decrease operation prevents stock from going below zero, returning an error if insufficient stock is available

### Example Usage

**Increase stock by default (1 unit):**

```bash
PATCH /products/1/increase-stock
Content-Type: application/json

{}
```

**Increase stock by custom amount:**

```bash
PATCH /products/1/increase-stock
Content-Type: application/json

{
  "quantity": 5
}
```

**Decrease stock by default (1 unit):**

```bash
PATCH /products/1/decrease-stock
Content-Type: application/json

{}
```

**Decrease stock by custom amount:**

```bash
PATCH /products/1/decrease-stock
Content-Type: application/json

{
  "quantity": 3
}
```

### Other Design Choices

- **Database**: SQLite for simplicity and ease of setup
- **ORM**: Prisma for type-safe database operations
- **Validation**: Server-side validation for all inputs
- **Error Handling**: Centralized error handling middleware
- **API Design**: RESTful conventions with clear, descriptive endpoints

## Database Schema

The system uses a single `Product` model with the following fields:

- `id`: Auto-incrementing primary key
- `name`: Unique product name
- `description`: Product description
- `stock_quantity`: Current stock level (default: 0)
- `low_stock_threshold`: Alert threshold for low stock (default: 0)
- `createdAt`: Timestamp of creation
- `updatedAt`: Timestamp of last update

## Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API route definitions
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── tests/           # Test files
└── server.js        # Application entry point
```

### Available Scripts

- `npm run dev` - Start development server with nodemon (for development only)
- `npm run start` - Start server
- `npm test` - Run test suite

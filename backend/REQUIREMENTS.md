# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## Table of Contents

1. [API Endpoints](#api-endpoints)
2. [Data Schema](#data-schema)
3. [Data Shapes](#data-shapes)

## API Endpoints

Get Postman Documentation from [this link](https://documenter.getpostman.com/view/10429678/VUjQnQiy)

> AUTHORIZATION TYPE: **_Bearer Token_**

#### Products

- Index
  - GET `/api/products`
- Show
  - GET `/api/product/:id`
- Create <sub>[token required]</sub>
  - POST `/api/product`
  - Body
    ```json
    {
      "name": "product name",
      "description": "product description",
      "price": 5,
      "category": "product category"
    }
    ```
- [OPTIONAL] Products by category (args: product category)
  - GET `/api/products/:category`
- [OPTIONAL] Top 5 most popular products `Not Implemented yet`
- [ADDED] Update <sub>[token required]</sub>
  - PATCH `/api/product/:id`
  - Body ➡️ (name,description, price, category) is optional
    ```json
    {
      "name": "product update"
    }
    ```
- [ADDED] Delete <sub>[token required]</sub>
  - DELETE `/api/product/:id`

#### Users

- Index <sub>[token required]</sub>
  - GET `/api/users`
- Show <sub>[token required]</sub>
  - GET `/api/user/:id`
- Create
  - POST `/api/register`
  - Body
    ```json
    {
      "email": "email@example.com",
      "firstname": "firstName",
      "lastname": "lastName",
      "password": "my_password"
    }
    ```
- [ADDED] Authenticate
  - POST `/api/login`
  - Body
    ```json
    {
      "email": "email@example.com",
      "password": "my_password"
    }
    ```

#### Orders -- [ TOKEN Required ]

- Current Order by user (args: user id)
  - GET `/api/user/:id/orders`
- [ADDED] Get All Orders
  - GET `/api/orders`
- [OPTIONAL] Completed Orders by user (args: user id)
  -Not Implemented
- [ADDED] Create Order
  - POST `api/order/user/:id`

## Data Schema

#### Products Schema

```postgresql
-- ! Create products table
CREATE TABLE IF NOT EXISTS products(
    id serial primary key,
    name varchar(255) NOT NULL,
    description TEXT NOT NULL,
    price float NOT NULL,
    category varchar(50));

```

#### Users Schema

```postgresql
-- ! Create users table
CREATE TABLE IF NOT EXISTS users(
    id serial primary key,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
    );

```

#### Orders Schema

```postgresql
-- ! Create orders table
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL primary key,
    status varchar(15),
    user_id bigint REFERENCES users(id)
);

```

#### Order Products Schema

```postgresql
-- ! Create order-products table
CREATE TABLE IF NOT EXISTS order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);

```

## Data Shapes

#### Product

```typescript
type Product = {
  id?: number | string;
  name: string;
  description: string;
  price: number;
  category: string;
};
```

#### User

```typescript
type User = {
  id?: string | number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
```

#### Orders

```typescript
type Order = {
  id?: number;
  status: string;
  user_id?: string;
};
```

#### Order Product

```typescript
type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
};
```

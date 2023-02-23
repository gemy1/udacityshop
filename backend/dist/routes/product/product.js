"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_1 = require("../../controller/product");
const productRouter = (0, express_1.Router)();
//index
productRouter.get("/products", product_1.indexProductsController);
//show
productRouter.get("/product/:id", product_1.showProductController);
//create
productRouter.post("/product", [
    (0, express_validator_1.body)("name", "Product name is missing").notEmpty(),
    (0, express_validator_1.body)("description", "Product description must be provided").notEmpty(),
    (0, express_validator_1.body)("price", "Product price is missing and must be a number")
        .notEmpty()
        .isNumeric(),
    (0, express_validator_1.body)("category", "Product category is missing or in invalid")
        .notEmpty()
        .isAlpha(),
], product_1.createProductController);
//update
productRouter.patch("/product/:id", [
    (0, express_validator_1.body)("name").trim(),
    (0, express_validator_1.body)("description").trim(),
    (0, express_validator_1.body)("price").trim(),
    (0, express_validator_1.body)("category").trim(),
], product_1.updateProductController);
//delete
productRouter.delete("/product/:id", product_1.deleteProductController);
//get products by category
productRouter.get("/products/:category", product_1.showByCategoryController);
exports.default = productRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.showByCategoryController = exports.updateProductController = exports.createProductController = exports.showProductController = exports.indexProductsController = void 0;
const express_validator_1 = require("express-validator");
const product_1 = require("../models/product");
const productStore = new product_1.ProductStore();
//index
const indexProductsController = async (req, res) => {
    try {
        const products = await productStore.index();
        return res.status(200).json({ products: products });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
};
exports.indexProductsController = indexProductsController;
//show product
const showProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productStore.show(id);
        if (!product) {
            throw new Error("product not found");
        }
        return res.status(200).json({ product: product });
    }
    catch (err) {
        //@ts-ignore
        return res.status(400).json({ message: err.message });
    }
};
exports.showProductController = showProductController;
//create product
const createProductController = async (req, res) => {
    const { name, description, price, category } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await productStore.create({
            name,
            description,
            price,
            category,
        });
        return res
            .status(201)
            .json({ message: "product created successfully", product: product });
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
};
exports.createProductController = createProductController;
//update product
const updateProductController = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await productStore.update(id, {
            name,
            description,
            price,
            category,
        });
        if (!product) {
            throw new Error("product not found");
        }
        return res
            .status(200)
            .json({ message: "product updated successfully", product: product });
    }
    catch (err) {
        //@ts-ignore
        return res.status(400).json({ message: err.message });
    }
};
exports.updateProductController = updateProductController;
// show by category
const showByCategoryController = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await productStore.showByCategory(category);
        if (products.length === 0) {
            throw new Error("No Products related to this category");
        }
        return res.status(200).json({ products: products });
    }
    catch (err) {
        //@ts-ignore
        return res.status(400).json({ message: err.message });
    }
};
exports.showByCategoryController = showByCategoryController;
const deleteProductController = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productStore.delete(id);
        if (!product) {
            throw new Error("product not found");
        }
        return res
            .status(200)
            .json({ message: "product deleted successfully", product: product });
    }
    catch (err) {
        //@ts-ignore
        return res.status(400).json({ message: err.message });
    }
};
exports.deleteProductController = deleteProductController;

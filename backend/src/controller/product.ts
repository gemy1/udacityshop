import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { Product, ProductStore } from "../models/product";

const productStore = new ProductStore();

//index
export const indexProductsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const products = await productStore.index();
    return res.status(200).json({ products: products });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

//show product
export const showProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const product = await productStore.show(id);
    if (!product) {
      throw new Error("product not found");
    }
    return res.status(200).json({ product: product });
  } catch (err) {
    //@ts-ignore
    return res.status(400).json({ message: err.message });
  }
};

//create product
export const createProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, description, price, category } = req.body;

  const errors = validationResult(req);
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
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

//update product
export const updateProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  const errors = validationResult(req);
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
  } catch (err) {
    //@ts-ignore
    return res.status(400).json({ message: err.message });
  }
};

// show by category
export const showByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { category } = req.params;
  try {
    const products = await productStore.showByCategory(category);
    if (products.length === 0) {
      throw new Error("No Products related to this category");
    }
    return res.status(200).json({ products: products });
  } catch (err) {
    //@ts-ignore
    return res.status(400).json({ message: err.message });
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const product = await productStore.delete(id);
    if (!product) {
      throw new Error("product not found");
    }
    return res
      .status(200)
      .json({ message: "product deleted successfully", product: product });
  } catch (err) {
    //@ts-ignore
    return res.status(400).json({ message: err.message });
  }
};

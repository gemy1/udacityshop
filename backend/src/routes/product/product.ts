import { Router } from "express";
import { body } from "express-validator";
import {
  indexProductsController,
  showProductController,
  createProductController,
  showByCategoryController,
  updateProductController,
  deleteProductController,
} from "../../controller/product";

import isAuth from "../../middleware/isAuth";

const productRouter: Router = Router();

//index
productRouter.get("/products", indexProductsController);

//show
productRouter.get("/product/:id", showProductController);

//create
productRouter.post(
  "/product",

  [
    body("name", "Product name is missing").notEmpty(),
    body("description", "Product description must be provided").notEmpty(),
    body("price", "Product price is missing and must be a number")
      .notEmpty()
      .isNumeric(),
    body("category", "Product category is missing or in invalid")
      .notEmpty()
      .isAlpha(),
  ],
  createProductController
);

//update
productRouter.patch(
  "/product/:id",
  [
    body("name").trim(),
    body("description").trim(),
    body("price").trim(),
    body("category").trim(),
  ],
  updateProductController
);

//delete
productRouter.delete("/product/:id", deleteProductController);

//get products by category
productRouter.get("/products/:category", showByCategoryController);

export default productRouter;

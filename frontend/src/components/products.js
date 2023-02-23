import React, { Fragment } from "react";
import ProductItem from "./product-item";

const Products = ({ products, onDelete }) => {
  return (
    <Fragment>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          price={product.price}
          description={product.description}
          onDelete={onDelete}
          id={product.id}
        />
      ))}
    </Fragment>
  );
};

export default Products;

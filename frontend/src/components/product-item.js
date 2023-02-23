import React, { Fragment } from "react";
import DeleteProduct from "./delete-product";

const ProductItem = ({ id, name, price, description, onDelete }) => {
  return (
    <Fragment>
      <div className="product">
        <div className="info">
          <div className="title">{name}</div>
          <div className="price">${price}</div>
        </div>
        <div className="des">{description}</div>

        <DeleteProduct onDelete={onDelete} id={id} />
      </div>
    </Fragment>
  );
};

export default ProductItem;

import React from "react";

function DeleteProduct({ onDelete, id }) {
  return (
    <div
      onClick={() => {
        onDelete(id);
      }}
      className="product-del"
    >
      Delete
    </div>
  );
}

export default DeleteProduct;

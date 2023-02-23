import React, { useState } from "react";

function ProductAdd({ onAddProduct }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !description || !price || !category) {
      setError("* All Fields must be provided");
      return;
    }
    const newProduct = {
      name: name,
      description: description,
      price: price,
      category: category,
    };
    onAddProduct(newProduct);
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setError("");
  };

  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <div className="input">
        <label>Title:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="input">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
      </div>
      <div className="input">
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(parseFloat(event.target.value))}
          placeholder=""
        />
      </div>
      <div className="input">
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Category"
        />
      </div>
      <button type="submit">Add Product</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default ProductAdd;

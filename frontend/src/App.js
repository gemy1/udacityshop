import { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/products";
import ProductAdd from "./components/product-add";
const api = "http://localhost:4000/api/";

function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const respons = await fetch(`${api}products`);
    const data = await respons.json();
    setProducts(data.products.reverse());
    return data.products;
  };
  useEffect(() => {
    getProducts();
  }, []);

  async function onAddProduct(product) {
    const respons = await fetch(`${api}product`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await respons.json();
    setProducts((prods) => {
      return [data.product, ...prods];
    });
  }
  const deleteProductHandler = async (id) => {
    await fetch(`${api}product/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    setProducts((prods) => {
      const newProds = prods.filter((product) => product.id !== id);
      return newProds;
    });
  };
  return (
    <div className="App App-header">
      <ProductAdd onAddProduct={onAddProduct} />
      <Products products={products} onDelete={deleteProductHandler} />
    </div>
  );
}

export default App;

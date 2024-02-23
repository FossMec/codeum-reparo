import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
const index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v2/product/get-all-products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
      });
  }, []);
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </ul>
    </div>
  );
};

export default index;

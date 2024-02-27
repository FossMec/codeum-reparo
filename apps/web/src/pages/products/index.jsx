import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Dashboard from "@/Layouts/Layout";
import SearchBar from "@/components/Searchbar";
const index = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/product/get-all-products`)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
      });
  }, []);
  return (
    <Dashboard>
      <SearchBar products={products} />
      <div>
        <Box
          display={"flex"}
          flexDirection={"row"}
          maxWidth={"100vw"}
          justifyContent={"space-around"}
        >
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </Box>
      </div>
    </Dashboard>
  );
};

export default index;

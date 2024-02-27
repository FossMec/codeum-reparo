import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import Dashboard from "@/Layouts/Layout";
import CartCard from "@/components/CartItems";

const index = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/delete-cart-item/${productId}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  // Function to handle quantity change
  const handleQtyChange = (productId, newQuantity) => {
    // Update the quantity of the specified product in the cart
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };
  function getCartItems() {
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_API}/user/get-cart-items`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data.cart);
          setCartItems(response.data.cart.items);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <Dashboard>
      <div>
        <Box
          display={"flex"}
          flexDirection={"column"}
          maxWidth={"100vw"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {cartItems.map((items) => (
            <CartCard
              key={items.productId._id}
              product={items}
              onRemoveFromCart={handleRemoveFromCart}
              onQtyChange={handleQtyChange}
            />
          ))}
        </Box>

        <Button variant="contained" color="primary">
          Proceed to checkout
        </Button>
      </div>
    </Dashboard>
  );
};

export default index;

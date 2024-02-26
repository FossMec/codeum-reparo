import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const ProductCard = ({ product }) => {
  const [cartItems, setCartItems] = useState([]); // Assuming you have a state to store cart items

  const handleAddToCart = async (product) => {
    try {
      // Make a request to your backend API to add the product to the cart
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/add-to-cart`,
        {
          productId: product._id,
          quantity: 1, // Assuming adding 1 quantity each time
          discount: product.discountPrice, // Assuming the product discount is available
        },
        { withCredentials: true } // Set withCredentials here
      );

      // Update the state or UI based on the response
      setCartItems(response.data.cart.items);
      alert("Product added to cart successfully!");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again later.");
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        src={product.imglink} // Replace with your image URL
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Category: {product.category}
        </Typography>
        <Typography variant="subtitle1" display="flex" alignItems="center">
          <Typography variant="body1" color="black" fontWeight={600}>
            ₹{product.discountPrice}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              textDecoration: "line-through",
              color: "text.disabled",
            }}
          >
            {product.originalPrice}
          </Typography>
        </Typography>
        <Typography variant="body2">Stock: {product.stock}</Typography>
        <Button
          onClick={() => {
            handleAddToCart(product);
            console.log("product", product);
          }}
          variant="contained"
          disabled={product.stock === 0}
          sx={{ mt: 2 }}
        >
          {product.stock === 0 ? "Sold Out" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

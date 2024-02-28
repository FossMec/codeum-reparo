import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Badge,
  Grid,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const CartCard = ({ product, onRemoveFromCart, onQtyChange }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    onQtyChange && onQtyChange(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQtyChange && onQtyChange(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    console.log("Removing product from cart", product.productId);
    onRemoveFromCart(product.productId._id);
  };

  const totalPrice = product.quantity * product.productId.totalPrice; // Assuming totalPrice is a field in the Product model

  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <CardMedia
        component="img"
        image={product.productId.imglink}
        alt={product.productId.name}
        sx={{ width: 150, height: 150, objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body1">{product.productId.name}</Typography>
        <Typography variant="body2">
          Price: {product.productId.totalPrice}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Grid container alignItems="center" gap={2}>
            <Box
              display={"flex"}
              alignItems={"center"}
              item
              xs={12}
              sm={4}
              gap={2}
            >
              <IconButton
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                sx={{
                  color: "blue",
                  borderRadius: "0",
                  border: "1px solid blue",
                  "&:hover": {
                    backgroundColor: "blue",
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ color: "black", fontSize: "1.3rem" }}
              >
                {quantity}
              </Typography>
              <IconButton
                onClick={handleIncrement}
                aria-label="Increase quantity"
                sx={{
                  color: "blue",
                  borderRadius: "0",
                  border: "1px solid blue",
                  "&:hover": {
                    backgroundColor: "blue",
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Grid item xs={12} sm={8}>
              <Button
                onClick={handleRemove}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Typography fontSize={"0.8rem"}>
          Total Price:{" "}
          <Typography fontStyle={"bold"}>
            ₹{product.discount * quantity}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartCard;

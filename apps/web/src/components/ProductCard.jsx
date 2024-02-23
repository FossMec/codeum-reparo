import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const ProductCard = ({ product }) => {
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

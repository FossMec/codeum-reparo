import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        height="140"
        image={product.image} // Replace with your image URL
        alt={product.name}
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2">Category: {product.category}</Typography>
        <br />
        <Typography variant="subtitle1" display={"flex"}>
          {product.originalPrice}
          <Typography variant="caption" sx={{ ml: "10px", color: "red" }}>
            {" "}
            <s>{product.originalPrice}</s>
          </Typography>
        </Typography>
        <Typography variant="subtitle1" color="primary">
          {product.discountPrice}
        </Typography>
        <br />
        <Typography variant="body2">Stock: {product.stock}</Typography>
        <Button variant="contained" disabled={product.stock === 0}>
          {product.stock === 0 ? "Sold Out" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

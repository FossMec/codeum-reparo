import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 16 }}>
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        elevation={3}
        style={{
          borderRadius: 20,
          padding: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{
            "& fieldset": { border: "none" },
          }}
          borderRadius={20}
          fullWidth
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          outline="none"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ outline: "none" }}>
                <IconButton size="large" disabled>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      {searchTerm && (
        <Grid container spacing={0} style={{ marginTop: 0 }}>
          {filteredProducts.length === 0 ? (
            <Typography variant="body1">No products found</Typography>
          ) : (
            filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12}>
                <Card sx={{ display: "flex", alignContent: "center" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 60, alignItems: "center" }}
                    src={product.imglink} // Replace with your image URL
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h8">{product.name}</Typography>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

export default SearchBar;

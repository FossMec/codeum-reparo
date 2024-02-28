import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
export default function AddressForm() {
  const [formData, setFormData] = useState({
    addressType: "shipping",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [addressSaved, setAddressSaved] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Call function to set POST request with the extracted values
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/update-user-address`,
        formData, // formData should be passed as the request body
        { withCredentials: true } // Options object for axios.post, including withCredentials
      );
      console.log("Response:", response.data);
      setAddressSaved(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
            {addressSaved ? "Address Saved" : "Save Address"}
          </Button>
        </Grid>
      </form>
    </>
  );
}

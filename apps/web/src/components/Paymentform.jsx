import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Checkbox
          checked={true} // Checked state controlled by cashOnDelivery state
          inputProps={{ "aria-label": "cash on delivery checkbox" }} // Aria label for accessibility
        />
        Cash on Delivery
      </Grid>
    </React.Fragment>
  );
}

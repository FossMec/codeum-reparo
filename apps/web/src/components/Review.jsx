import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import axios from "axios";

export default function Review() {
  const [cartItems, setCartItems] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);

  function getUserAddress() {
    console.log("getUserAddress");
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_API}/user/get-user-address`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("hello", response.data.users);
          setAddresses(response.data.users.addresses[0]);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
    getUserAddress();
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.productId._id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.productId.name}
              secondary={product.discount}
            />
            <Typography variant="body2">
              {product.productId.discount}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{JSON.stringify(addresses)}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

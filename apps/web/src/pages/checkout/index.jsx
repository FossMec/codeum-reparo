import Dashboard from "@/Layouts/Layout";
import AddressForm from "@/components/Addressform";
import Checkout from "@/components/Checkout";
import React from "react";

const index = () => {
  return (
    <div>
      <Dashboard>
        <Checkout />
      </Dashboard>
    </div>
  );
};

export default index;

import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import InputField from "../Components/InputField";
import { InvoiceContext } from "../Context/InvoiceContext";
import ServiceContainer from "../Components/ServiceContainer";
import ProductContainer from "../Components/ProductsContainer";
import TotalCard from "../Components/TotalCard";

const Main = () => {
  const { invoice } = useContext(InvoiceContext);

  const handleSubmit = () => {
    // console.log(invoice);
    fetch("/generateinvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice), // body data type must match "Content-Type" header
    });
  };

  return (
    <div>
      <Navbar title="Manual Billing" />
      <form
        className="card-contianer"
        onChange={(e) => e.preventDefault()}
        onSubmit={(e) => e.preventDefault()}
      >
        <Card title="Customer Details">
          <InputField name="customerName" placeHolder="Name" />
          <InputField name="customerPhone" placeHolder="Number" type="number" />
          <InputField name="customerEmail" placeHolder="Email" type="email" />
          <InputField name="customerAddress" placeHolder="Address" />
        </Card>

        <Card title="Technician Details">
          <InputField name="technicianName" placeHolder="Name" />
          <InputField
            name="technicianPhone"
            placeHolder="Number"
            type="number"
          />
        </Card>

        <Card title="Service Details" />
        <ServiceContainer />

        <Card title="Product Details" />
        <ProductContainer />

        <Card title="Discount (%)">
          <InputField
            name="discount"
            placeHolder="discount"
            type="number"
            max={100}
          />
        </Card>

        <Card title="Total Amount">
          <TotalCard />
        </Card>

        <button onClick={handleSubmit}>Send Invoice</button>
      </form>
    </div>
  );
};

export default Main;

import { Container } from "@mui/material";
import React from "react";
import Header from "../../Header/Header";
import ProductList from "../../ProductList/ProductList";
import "./HomePage.css";

function Homepage() {
  const productData = {
    PID: "XDZR-b4SMBJKDKWn0QdG",
    creationTime: "2022-11-26T06:27:10.947Z",
    title: "Generic Multi-Purpose Mountain Bike Repair Toolkit, Adult",
    description:
      "Packer: Eagle Network Supply Pvt. Ltd. , Khasra No. 399 Delhi - 110030\nIncludes: 1 Mountain Bike Repair Toolkit\nColor: Black",
    category: "handle",
    stock: 300,
    offer: 0,
    price: 193,
  };

  return (
    <div>
      <Header title={"Explore and find your favorate products"} path={"Nester > Home"} />
      <Container>
        <ProductList data={productData}></ProductList>
      </Container>
    </div>
  );
}

export default Homepage;

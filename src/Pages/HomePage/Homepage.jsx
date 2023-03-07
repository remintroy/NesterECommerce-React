import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { searchBackend } from "../../axios";
import Header from "../../components/Header/Header";
import ProductList from "../../components/ProductList/ProductList";
import "./HomePage.css";

function Homepage() {
  const [productData, setProductData] = useState([1, 2, 3, 4, 5]);

  // {
  //   PID: "QooEUSLGqGCIBksMzyQ6",
  //   creationTime: "2022-11-26T06:27:10.947Z",
  //   title: "Generic Multi-Purpose Mountain Bike Repair Toolkit, Adult",
  //   description:
  //     "Packer: Eagle Network Supply Pvt. Ltd. , Khasra No. 399 Delhi - 110030\nIncludes: 1 Mountain Bike Repair Toolkit\nColor: Black",
  //   category: "handle",
  //   stock: 300,
  //   offer: 0,
  //   price: 193,
  // }

  useEffect(() => {
    const getSampleProductData = async () => {
      try {
        const {
          data: { message },
        } = await searchBackend.get("/api/search?q= ");
        setProductData(message);
      } catch (error) {
        console.log(error);
      }
    };
    getSampleProductData();
  }, []);

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

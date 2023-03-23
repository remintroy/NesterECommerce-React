import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { searchBackend } from "../../configs/axios.js";
import Header from "../../components/Header/Header"; 
import ProductList from "../../components/ProductList";
import "./HomePage.css";

function Homepage() {
  const [productData, setProductData] = useState([1, 2, 3, 4, 5, 5]);

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
    <>
      <Header title={"Explore and find your favorate products"} path={"Nester > Home"} />
      <Container>
        <h3>#Top 6</h3>
        <ProductList data={productData.slice(0, 6)}></ProductList>
      </Container>
    </>
  );
}

export default Homepage;

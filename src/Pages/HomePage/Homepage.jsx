import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { searchBackend } from "../../axios";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import ProductList from "../../components/ProductList/ProductList";
import "./HomePage.css";

function Homepage() {
  const [productData, setProductData] = useState([1, 2, 3, 4, 5,5]);

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
    <NavBar>
      <Header title={"Explore and find your favorate products"} path={"Nester > Home"} />
      <Container>
        <h3>#Top 6</h3>
        <ProductList data={productData.slice(0,6)}></ProductList>
      </Container>
    </NavBar>
  );
}

export default Homepage;

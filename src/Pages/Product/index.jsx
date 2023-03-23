import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsBackend, searchBackend } from "../../configs/axios.js";
import Header from "../../components/Header/Header";
import "./Product.css";
import ProductView from "../../components/ProductView";
import ProductList from "../../components/ProductList";

function Product() {
  const { pid } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    document.getElementById("content").scrollTop = 0;
    setProductData(null);
    (async () => {
      try {
        const { data } = await productsBackend.get(`/${pid}`);
        setProductData(data);
      } catch (error) {
        console.warn("Error : ", error);
      }
    })();
  }, [pid]);

  const [productsData, setProductsData] = useState([1, 2, 3, 4, 5, 5]);

  useEffect(() => {
    const getSampleProductData = async () => {
      try {
        const {
          data: { message },
        } = await searchBackend.get("/api/search?q= ");
        setProductsData(message);
      } catch (error) {
        console.log(error);
      }
    };
    getSampleProductData();
  }, []);

  return (
    <>
      <Header
        title={productData?.title ? `Product from ${productData?.category}` : null}
        path={`Nester > ${productData?.category}`}
      />
      <Container>
        <ProductView productData={productData} />
        <br />
        <hr />
        <h3>Related Products</h3>
        <ProductList data={productsData} />
      </Container>
    </>
  );
}

export default Product;

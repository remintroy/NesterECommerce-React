import React from "react";
import "./ProductList.css";
import { staticFilesBacked } from "../../configs/axios.js";
import Rating from "@mui/material/Rating";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductList({ data, singleList }) {
  const navigate = useNavigate();

  const SkeltionLoading = () => {
    return (
      <div className="ProductList">
        <div className="imgCont">
          <Skeleton variant="rounded" animation="wave" height={"100%"} />
        </div>
        <div className="dataCont skl">
          <div className="category">
            <Skeleton variant="rounded" animation="wave" height={"70px"} width={"100%"} />
          </div>
          <Skeleton variant="rounded" animation="wave" height={"20px"} />
          <div>
            <Skeleton variant="rounded" animation="wave" height={"90px"} />
          </div>
        </div>
      </div>
    );
  };

  const ProductListComponent = ({ data }) => {
    if (!data?.PID) return <SkeltionLoading />;

    // TODO: Change PID to pid
    const { PID, title, category, stock, offer, price, rating } = data;

    return (
      <div className="ProductList" onClick={() => navigate(`/product/${PID}`)}>
        <div className="imgCont">
          <img src={`${staticFilesBacked}/product_images/${PID}1.jpg`} alt="Product" />
        </div>
        <div className="dataCont">
          <div className="titleTxt">{title}</div>
          <div className="category A">
            <small>
              <b className="A">{category}</b>
            </small>
          </div>
          <div className="price">
            <b>Price: ₹{Number(price) - Number(offer || 0)}</b>
            {offer > 0 && <b className="offer"> {offer}Rs OFF</b>}
          </div>
          <div>
            <small>{true ? `MRP : ₹${price}` : ""}</small>
          </div>
          <div>
            <small className={`category ${stock <= 5 ? "danger" : ""}`}>
              {stock > 5 ? "In Stock" : stock > 0 ? `Only ${stock} Left Hurry up!` : "Out of stock"}
            </small>
          </div>
          <Rating name="simple-controlled" value={rating} readOnly />
        </div>
      </div>
    );
  };

  const ProductListUlComponent = ({ children }) => {
    return <div className={`productUl ${singleList ? "singleList" : ""}`}>{children}</div>;
  };

  return (
    <ProductListUlComponent>
      {data?.map((product, index) => {
        return <ProductListComponent key={product?.PID ? product.PID : index} data={product}></ProductListComponent>;
      })}
    </ProductListUlComponent>
  );
}

export default ProductList;

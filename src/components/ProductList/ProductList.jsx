import React, { useState } from "react";
import "./ProductList.css";
import { staticFilesBacked } from "../../axios";
import Rating from "@mui/material/Rating";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductList(props) {
  // PID: "XDZR-b4SMBJKDKWn0QdG",
  // creationTime: "2022-11-26T06:27:10.947Z",
  // title: "Generic Multi-Purpose Mountain Bike Repair Toolkit, Adult",
  // description:
  //   "Packer: Eagle Network Supply Pvt. Ltd. , Khasra No. 399 Delhi - 110030\nIncludes: 1 Mountain Bike Repair Toolkit\nColor: Black",
  // category: "handle",
  // stock: 300,
  // offer: 0,
  // price: 193,

  const [value, setValue] = useState(2);
  const navigate = useNavigate();

  const skeltionLoading = () => {
    return (
      <div className="ProductList">
        <div className="imgCont">
          <Skeleton variant="rounded" animation="wave" height={"100%"} />
        </div>
        <div className="dataCont skl">
          <div className="category">
            <Skeleton variant="rounded"  animation="wave" height={"70px"} width={"100%"} />
          </div>
          <Skeleton variant="rounded" animation="wave" height={"20px"} />
          <div>
            <Skeleton variant="rounded" animation="wave" height={"90px"} />
          </div>
        </div>
      </div>
    );
  };

  const ProductListComponent = (props) => {
    if (!props?.data?.PID) return skeltionLoading();

    const {
      data: { PID, title, category, stock, offer, price },
    } = props;

    return (
      <div className="ProductList" onClick={() => navigate(`/product/${PID}`)}>
        <div className="imgCont">
          <img src={`${staticFilesBacked}/product_images/${PID}1.jpg`} alt="Product" />
        </div>
        <div className="dataCont">
          <div className="titleTxt">{title}</div>
          <div className="category">
            <small>
              <b>{category}</b>
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
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </div>
      </div>
    );
  };

  const ProductListUlComponent = ({ children }) => {
    return <div className="productUl">{children}</div>;
  };

  return (
    <ProductListUlComponent>
      {props?.data?.map((product, index) => {
        return <ProductListComponent key={product?.PID ? product.PID : index} data={product}></ProductListComponent>;
      })}
    </ProductListUlComponent>
  );
}

export default ProductList;

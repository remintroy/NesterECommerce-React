import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsBackend, staticFilesBacked } from "../../axios";
import Header from "../../components/Header/Header";
import "./Product.css";
import { Button, Rating, Skeleton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductView() {
  const { pid } = useParams();

  const [productData, setProductData] = useState(null);
  const [isPc] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productsBackend.get(`/api/product/${pid}`);
        setProductData(data);
      } catch (error) {
        console.warn("Error : ", error);
      }
    })();
  }, [pid]);

  const SkeltonLodingForProductDescriptions = () => {
    return (
      <div className="ProductBasisMb">
        <div className="left">
          <div className="displayImgCont">
            <Skeleton variant="rounded" animation="wave" height={"100%"} />
          </div>
          <div className="moreImgList">
            <Skeleton variant="rounded" animation="wave" height={"110px"} width="110px" />
            <Skeleton variant="rounded" animation="wave" height={"110px"} width="110px" />
            <Skeleton variant="rounded" animation="wave" height={"110px"} width="110px" />
            <Skeleton variant="rounded" animation="wave" height={"110px"} width="110px" />
          </div>
        </div>
        <div className="right">
          <h3>
            <Skeleton variant="rounded" animation="wave" />
          </h3>
          <div className="category">
            <Skeleton variant="rounded" animation="wave" />
          </div>
          <br />
          <div className="price">
            <Skeleton variant="rounded" animation="wave" height="20px" width={"30%"} />
          </div>
          <br />
          <div>
            <Skeleton variant="rounded" animation="wave" height="70px" width={"30%"} />
          </div>
          <br />
          <Skeleton variant="rounded" animation="wave" height="30px" width={"70%"} />
          <br />
          <Skeleton variant="rounded" animation="wave" height="150px" width={"100%"} />
        </div>
      </div>
    );
  };

  const ProductDescriptionsPc = () => {
    if (!productData?.title) return <SkeltonLodingForProductDescriptions />;

    // getting nessory values
    const { title, category, price, offer, rating, creationTime, stock, description, PID } = productData;

    return (
      <div className="ProductBasisPc">
        <div className="left">
          <div className="displayImgCont">
            <img src={staticFilesBacked + `/product_images/${PID}1.jpg`} alt="Display" />
          </div>
          <div className="moreImgList">
            <img src={staticFilesBacked + `/product_images/${PID}1.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${PID}2.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${PID}3.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${PID}4.jpg`} alt="sub" />
          </div>
        </div>
        <div className="right">
          <h3>{title}</h3>
          <div className="flex br">
            <span className="b dim A">{category}</span>
            <Rating name="rating" value={rating} readOnly />
          </div>
          <div className="price b flex br">
            Selling Price: ₹{Number(price) - Number(offer || 0)}
            {offer > 0 && <span className="offer"> {offer}Rs OFF</span>}
          </div>
          <div className="sm b danger">Maximum retail prize : ₹{price}</div>
          <div className="sm dim br">
            Product added on : {new Date(creationTime).toDateString()} -{" "}
            <span className={` ${stock <= 5 ? "danger" : ""}`}>
              {stock > 5 ? "In Stock" : stock > 0 ? `Only ${stock} Left Hurry up!` : "Out of stock"}
            </span>
          </div>
          <div className="buttonCont bbr">
            <Button variant="contained" startIcon={<AddShoppingCartIcon />} color="secondary">
              Add to cart
            </Button>
            <Button variant="contained" color="success">
              Buy now
            </Button>
          </div>
          <div className="sm dim bbr">Product description</div>
          <div className="br">{description}</div>
        </div>
      </div>
    );
  };

  // Component
  const ProductDescriptionsMb = () => {
    if (!productData?.title) return <SkeltonLodingForProductDescriptions />;

    // getting nessory values
    const { title, category, price, offer, rating, creationTime, stock, description } = productData;

    return (
      <div className="ProductBasis">
        {!isPc && (
          <>
            <h3>{title}</h3>
          </>
        )}
        <div className="left">
          <div className="displayImgCont">
            <img src={staticFilesBacked + `/product_images/${productData?.PID}1.jpg`} alt="Display" />
          </div>
          <div className="moreImgList">
            <img src={staticFilesBacked + `/product_images/${productData?.PID}1.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${productData?.PID}2.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${productData?.PID}3.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${productData?.PID}4.jpg`} alt="sub" />
          </div>
        </div>
        <div className="right">
          {isPc && <h3>{title}</h3>}
          {!isPc && <br />}
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
          <Rating name="read-only" value={rating} readOnly />
          <div className="category">
            <small>
              Added on : {new Date(creationTime).toDateString()} -{" "}
              <span className={`category ${stock <= 5 ? "danger" : ""}`}>
                {stock > 5 ? "In Stock" : stock > 0 ? `Only ${stock} Left Hurry up!` : "Out of stock"}
              </span>
            </small>
          </div>
          <br />
          <div className="buttonCont">
            <Button variant="contained" startIcon={<AddShoppingCartIcon />} color="secondary" size="large">
              Add to cart
            </Button>
            <Button variant="contained" color="success" size="large">
              Buy now
            </Button>
          </div>
          <div className="category">
            <br />
            <small>Product description</small>
          </div>
          <p>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header title={productData?.title ? `Product from ${productData?.category}` : null} path="Nester > Product" />
      <Container>
        {!isPc && <ProductDescriptionsMb />}
        {isPc && <ProductDescriptionsPc />}
      </Container>
    </>
  );
}

export default ProductView;

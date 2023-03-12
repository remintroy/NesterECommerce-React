import { Button, Rating, Skeleton } from "@mui/material";
import React, { useContext } from "react";
import { cartBackend, staticFilesBacked } from "../../configs/axios.js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./ProductView.css";
import NotiUserContext from "../../context/NotiUserContext.jsx";

const SkeltonLoding = () => {
  return (
    <div className="ProductViewComponent">
      <div className="left">
        <div className="displayImgCont">
          <Skeleton variant="rounded" animation="wave" height={"100%"} />
        </div>
        <div className="moreImgList">
          <Skeleton variant="rounded" animation="wave" height={"85px"} width="85px" />
          <Skeleton variant="rounded" animation="wave" height={"85px"} width="85px" />
          <Skeleton variant="rounded" animation="wave" height={"85px"} width="85px" />
          <Skeleton variant="rounded" animation="wave" height={"85px"} width="85px" />
        </div>
      </div>
      <div className="right">
        <h3>
          <Skeleton variant="rounded" animation="wave" height={"85px"} /> <br />
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

function ProductView({ productData }) {
  const { notiUser } = useContext(NotiUserContext);

  const addToCart = (pid) => {
    try {
      const { data } = cartBackend.post("/add", { pid },);
      //...
    } catch (error) {
      notiUser(error, false, null);
    }
  };

  const ProductViewPC = () => {
    if (!productData?.title) return <SkeltonLoding />;

    // getting nessory values
    const { title, category, price, offer, rating, creationTime, stock, description, pid } = productData;

    return (
      <div className="ProductViewComponent">
        <div className="left">
          <div className="displayImgCont">
            <img src={staticFilesBacked + `/product_images/${pid}1.jpg`} alt="Display" />
          </div>
          <div className="moreImgList">
            <img src={staticFilesBacked + `/product_images/${pid}1.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${pid}2.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${pid}3.jpg`} alt="sub" />
            <img src={staticFilesBacked + `/product_images/${pid}4.jpg`} alt="sub" />
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
          <div className="b bbr">Product description</div>
          <div className="br">{description}</div>
        </div>
      </div>
    );
  };

  return <ProductViewPC />;
}

export default ProductView;

import { Alert, Button, Rating, Skeleton } from "@mui/material";
import { cartBackend, staticFilesBacked } from "../../configs/axios.js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./ProductView.css";
import SizeButton from "../SizeButton/SizeButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { pushNoti } from "../../redux/notiSlice.js";

// skelton for prouduct detail view
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

// add to cart and buy now buttons
const ActionButtons = ({ data }) => {
  const dispatch = useDispatch();
  const { price, offer, pid } = data;
  const user = useSelector((state) => state.user.data);

  // adds product to cart
  const addToCart = async (pid) => {
    if (!user) {
    } else {
      try {
        // eslint-disable-next-line
        const { data } = await cartBackend.post(
          "/add",
          { pid, quantity: undefined },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } }
        );
        dispatch(pushNoti({ message: data?.message ? data.message : "Success", success: true }));
      } catch (error) {
        dispatch(
          pushNoti({
            message: error?.response?.data?.error ? error?.response?.data?.error : "Faild while adding to cart",
            error: true,
          })
        );
      }
    }
  };

  // buttons
  return (
    <div className="buttonCont bbr">
      <Button variant="contained" startIcon={<AddShoppingCartIcon />} color="warning" onClick={() => addToCart(pid)}>
        Add to cart
      </Button>
      <Button variant="contained" color="success">
        ₹{Number(price) - Number(offer || 0)} : Buy Now
      </Button>
    </div>
  );
};

function ProductView({ productData }) {
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
          <div className="sm b danger">MRP : ₹{price}</div>
          {stock <= 5 && (
            <Alert severity="error" className="br">
              {stock > 0 ? `Only ${stock} Left Hurry up!` : "Out of stock"}
            </Alert>
          )}
          <br />
          <div>Choose your size</div>
          <div className="br flex">
            <SizeButton />
          </div>
          <ActionButtons data={productData} />
          <div className="b bbr">Product description</div>
          <div className="sm dim br">
            Product added on : {new Date(creationTime).toDateString()}
            {stock > 5 && <span className="success"> - In Stock</span>}
          </div>
          <div className="br">{description}</div>
        </div>
      </div>
    );
  };

  return <ProductViewPC />;
}

export default ProductView;

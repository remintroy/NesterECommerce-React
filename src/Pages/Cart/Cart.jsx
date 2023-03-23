import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import "./Cart.css";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return <div className="Cart">Shopping Cart is on maintaince</div>;
};

export default Cart;

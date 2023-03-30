import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Cart.css";

const Cart = () => {
  const user = useSelector((state) => state.user.data);
  // const [cart, setCart] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="Cart">
      <h1 style={{ textAlign: "center" }}>Cart</h1>
    </div>
  );
};

export default Cart;

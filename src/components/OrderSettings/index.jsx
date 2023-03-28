import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersBackend } from "../../configs/axios";
import { setNavBarData } from "../../redux/navBarSlice";
import OrderProductList from "../OrderProductList/OrderProductList";
import "./OrderSettings.css";

const OrderSettings = () => {
  const [orders, setOrders] = useState([{ products: [1, 2, 3] }]); // shows 3 order skeletons
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavBarData({ message: "Order Settings", path: "/settings" }));
    return () => {
      dispatch(setNavBarData({ message: null, path: null }));
    };
  }, [dispatch]);

  // order data
  useEffect(() => {
    const getOrderData = async () => {
      try {
        const { data } = await ordersBackend.get("/all", { headers: { Authorization: `Bearer ${user?.accessToken}` } });
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderData();
  }, [user]);

  return (
    <div className="OrderSettings">
      {orders.map((order, index) => {
        return <OrderProductList data={order} key={order?.orderID ? order?.orderID : index} />;
      })}
    </div>
  );
};

export default OrderSettings;

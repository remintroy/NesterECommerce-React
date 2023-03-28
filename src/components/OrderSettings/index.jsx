import React, { useContext, useEffect, useState } from "react";
import { ordersBackend } from "../../configs/axios";
import NavBarContext from "../../context/NavBarContext";
import UserContext from "../../context/UserContext";
import OrderProductList from "../OrderProductList/OrderProductList";
import "./OrderSettings.css";

const OrderSettings = () => {
  const [orders, setOrders] = useState([{ products: [1, 2, 3] }]); // shows 3 order skeletons

  const { user } = useContext(UserContext);
  const { setInNav } = useContext(NavBarContext);

  useEffect(() => {
    setInNav({ message: "Order Settings", path: "/settings" });
    return () => {
      setInNav(null);
    };
  }, [setInNav]);

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

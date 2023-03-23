import React, { useContext, useEffect } from "react";
import NavBarContext from "../../context/NavBarContext"; 
import "./OrderSettings.css";

const OrderSettings = () => {
  const { setInNav } = useContext(NavBarContext);

  useEffect(() => {
    setInNav({ message: "Order Settings", path: "/settings" });
    return () => {
      setInNav(null);
    };
  }, [setInNav]);

  return (
    <div className="OrderSettings">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, voluptas sed nesciunt alias temporibus error
      repudiandae, nemo explicabo sapiente ea repellendus culpa dicta ad deserunt perspiciatis cumque sint nostrum minima.
    </div>
  );
};

export default OrderSettings;

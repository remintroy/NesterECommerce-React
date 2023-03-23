import { useContext, useEffect } from "react";
import NavBarContext from "../../context/NavBarContext";
import "./style.css";

const AddressSettings = () => {
  const { setInNav } = useContext(NavBarContext);

  useEffect(() => {
    setInNav({ message: "Addresss Settings", path: "/settings" });
    return () => {
      setInNav(null);
    };
  }, [setInNav]);

  return <div className="AddressSettings">Address Settings</div>;
};

export default AddressSettings;

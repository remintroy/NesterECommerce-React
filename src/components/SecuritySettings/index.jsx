import { useContext, useEffect } from "react";
import NavBarContext from "../../context/NavBarContext"; 
import "./SecuritySettings.css";

const SecuritySettings = () => {
  const { setInNav } = useContext(NavBarContext);

  useEffect(() => {
    setInNav({ message: "Security Settings", path: "/settings" });
    return () => {
      setInNav(null);
    };
  }, [setInNav]);

  return <div></div>;
};

export default SecuritySettings;

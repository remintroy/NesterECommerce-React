import { useContext, useEffect } from "react";
import NavBarContext from "../../context/NavBarContext";
import "./WalletSettings.css";

const WalletSettings = () => {

  const { setInNav } = useContext(NavBarContext);

  useEffect(() => {
    setInNav({ message: "Wallet Settings", path: "/settings" });
    return () => {
      setInNav(null);
    };
  }, [setInNav]);

  return <div>Wallet settigns</div>;
};

export default WalletSettings;

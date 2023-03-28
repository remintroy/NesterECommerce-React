import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNavBarData } from "../../redux/navBarSlice";
import "./WalletSettings.css";

const WalletSettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavBarData({ message: "Wallet Settings", path: "/settings" }));
    return () => {
      dispatch(setNavBarData({ message: null, path: null }));
    };
  }, [dispatch]);

  return <div>Wallet settigns</div>;
};

export default WalletSettings;

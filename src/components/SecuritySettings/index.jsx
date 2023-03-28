import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNavBarData } from "../../redux/navBarSlice";
import "./SecuritySettings.css";

const SecuritySettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavBarData({ message: "Security Settings", path: "/settings" }));
    return () => {
      dispatch(setNavBarData({ message: null, path: null }));
    };
  }, [dispatch]);

  return <div></div>;
};

export default SecuritySettings;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNavBarData } from "../../redux/navBarSlice";
import "./style.css";

const AddressSettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavBarData({ message: "Addresss Settings", path: "/settings" }));
    return () => {
      dispatch(setNavBarData({ message: null, path: null }));
    };
  }, [dispatch]);

  return <div className="AddressSettings">Address Settings</div>;
};

export default AddressSettings;

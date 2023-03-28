import "./App.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Homepage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import ProductView from "./Pages/Product";
import SignIn from "./Pages/SignIn/SignIn";
import NavBar from "./components/NavBar/NavBar";
import Cart from "./Pages/Cart/Cart";
import NotiUser from "./components/NotiUser/NotiUser";
import Shop from "./Pages/Shop";
import Settings from "./Pages/Settings";
import NavBarContext from "./context/NavBarContext";
import SignUp from "./Pages/SignUp/SignUp";
import { fetchUserData, refreshToken } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  const [InNav, setInNav] = useState(null);
  // const [theme, setTheme] = useState("dark");

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // get refresh token
    const timer = setTimeout(() => {
      (async () => {
        dispatch(refreshToken());
      })();
    }, 19 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // console.log("app rendered")

  return (
    <CssVarsProvider>
      <NavBarContext.Provider value={{ InNav, setInNav }}>
        <NavBar inNav={InNav} setInNav={setInNav}>
          <Routes>
            {[
              "/settings",
              "/settings/account",
              "/settings/orders",
              "/settings/addresses",
              "/settings/wallets",
              "/settings/security",
            ].map((path, index) => (
              <Route path={path} element={<Settings />} key={index} />
            ))}
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:pid" element={<ProductView />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NavBar>
        <NotiUser />
      </NavBarContext.Provider>
    </CssVarsProvider>
  );
}

export default App;

import "./App.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import Homepage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import ProductView from "./Pages/Product";
import SignIn from "./Pages/SignIn/SignIn";
import NavBar from "./components/NavBar";
import { authBackend } from "./configs/axios";
import NotiUserContext from "./context/NotiUserContext";
import NotiUser from "./components/NotiUser";
import Shop from "./Pages/Shop";
import Settings from "./Pages/Settings";

function App() {
  const [user, setUser] = useState(null);
  const [notiData, setNotiData] = useState({ message: "Welcome to Nester", error: false, action: "Ok" });
  // const [theme, setTheme] = useState("dark");

  const refreshUser = async () => {
    try {
      const { data } = await authBackend.get("/user_data");
      setUser(data?.email ? data : null);
    } catch (error) {
      notiUser(error, false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await authBackend.get("/user_data");
        setUser(data?.email ? data : null);
      } catch (error) {
        notiUser(error, false);
      }
    })();
  }, []);

  useEffect(() => {
    // get refresh token
    const timer = setTimeout(() => {
      (async () => {
        try {
          const { data } = await authBackend.get("/refresh");
          setUser((pre) => {
            return { ...pre, accessToken: data };
          });
        } catch (error) {
          notiUser(error, false);
        }
      })();
    }, 19 * 60 * 1000);

    return () => clearTimeout(timer);
    //
  }, [user]);

  const notiUser = ({ message, good, action }) => {
    if (!message) return;
    setNotiData({ message: message, action: action ? action : "", good: good ? true : false });
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      <NotiUserContext.Provider value={{ notiUser, notiData, setNotiData }}>
        <CssVarsProvider>
          <NavBar>
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
              <Route path="/shop" element={<Shop />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NavBar>
          <NotiUser />
        </CssVarsProvider>
      </NotiUserContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

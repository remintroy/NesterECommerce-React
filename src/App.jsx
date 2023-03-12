import "./App.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import Homepage from "./Pages/HomePage/Homepage";
import NotFound from "./Pages/NotFound/NotFound";
import ProductView from "./Pages/Product/Product";
import SignIn from "./Pages/SignIn/SignIn";
import NavBar from "./components/NavBar/NavBar";
import { authBackend } from "./configs/axios";
import NotiUserContext from "./context/NotiUserContext";

function App() {
  const [user, setUser] = useState(null);

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

    return () => {
      clearTimeout(timer);
    };
  }, [user]);

  const notiUser = ({ message, good, action }) => {
    console.log(message, good, action);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NotiUserContext.Provider value={{ notiUser }}>
        <CssVarsProvider>
          <NavBar>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/product/:pid" element={<ProductView />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NavBar>
        </CssVarsProvider>
      </NotiUserContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

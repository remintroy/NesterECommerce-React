import "./App.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import Homepage from "./Pages/HomePage/Homepage";
import NotFound from "./Pages/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import ProductView from "./Pages/Product/Product";
import SignIn from "./Pages/SignIn/SignIn";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
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
  );
}

export default App;

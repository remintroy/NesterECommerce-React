import "./App.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import Homepage from "./Pages/HomePage/Homepage";
import NotFound from "./Pages/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import ProductView from "./Pages/ProductView/ProductView";
import SignIn from "./Pages/SignIn/SignIn";

function App() {
  return (
    <CssVarsProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:pid" element={<ProductView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CssVarsProvider>
  );
}

export default App;

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import Homepage from "./components/Pages/HomePage/Homepage";

function App() {
  return (
    <CssVarsProvider>
      <NavBar>
        <Homepage />
      </NavBar>
    </CssVarsProvider>
  );
}

export default App;

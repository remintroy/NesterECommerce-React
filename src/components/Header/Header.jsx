import { Container } from "@mui/material";
import React from "react";
import "./Header.css";

function Header(props) {
  return (
    <div className="Header">
      <Container maxWidth="lg">
        <div>
          <h1>{props?.title ? props.title : "Explore new products !"}</h1>
          <p>{props?.path ? props.path : ""}</p>
        </div>
      </Container>
    </div>
  );
}

export default Header;

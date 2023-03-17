import React from "react";
import "./Shop.css";
import CategoryChip from "../../components/CategoryChip";
import { Container } from "@mui/system";
import Header from "../../components/Header";

function Shop() {
  return (
    <div className="Shop">
      <Header title="Find your favorate products" path="Nester > Shop" />
      <Container>
        <CategoryChip />
      </Container>
    </div>
  );
}

export default Shop;

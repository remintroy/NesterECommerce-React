import React from "react";
import "./Shop.css";
import CategoryChip from "../../components/CategoryChip/CategoryChip";
import { Container } from "@mui/system";
import Header from "../../components/Header/Header";

function Shop() {
  return (
    <div className="Shop">
      <Header title="Find your favorate products" path="Nester > Shop" />
      <Container>
        <iframe
        style={{borderRadius:"5px"}}
          width="100%"
          height="635"
          src="https://www.youtube.com/embed/tdW0Gv9WDP4?controls=0&amp;start=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <CategoryChip />
      </Container>
    </div>
  );
}

export default Shop;

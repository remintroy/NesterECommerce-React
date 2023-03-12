import { Container, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Header.css";

function Header(props) {
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 766);

  useEffect(() => {
    window.addEventListener("resize", () => setThisIsPc(window.innerWidth > 766));
  }, []);

  if (!thisIsPc) return "";

  return (
    <div className="Header">
      <Container maxWidth="lg">
        <div>
          {!props?.title && (
            <Stack spacing={1}>
              <Skeleton variant="rounded" height={"40px"} width={"100%"} />
              <Skeleton variant="rounded" height={"20px"} width={"150px"} />
            </Stack>
          )}
          {props?.title && (
            <>
              <h1>{props?.title ? props.title : "Explore new products !"}</h1>
              <p>{props?.path ? props.path : ""}</p>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Header;

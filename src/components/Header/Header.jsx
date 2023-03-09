import { Container, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import "./Header.css";

function Header(props) {
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

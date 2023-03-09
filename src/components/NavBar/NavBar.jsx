import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function NavBar(props) {
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 766);
  const [isScrolled, setIsScorlled] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => setThisIsPc(window.innerWidth > 766));
    if (contentRef?.current) {
      contentRef?.current?.addEventListener("scroll", () => {
        let scrolled = contentRef?.current.offsetTop + contentRef?.current.scrollTop + contentRef?.current.clientTop > 0;
        if (isScrolled !== scrolled) setIsScorlled(scrolled);
      });
    }
  }, [contentRef, isScrolled]);

  return (
    <>
      {!thisIsPc && (
        <div className={`NavBar ${isScrolled ? "shadow" : ""}`}>
          {!showSuggestions && (
            <>
              <div className="logo">
                <Link to={"/"}>
                  <img src="/logo/logo.png" alt="Logo" />
                </Link>
              </div>
              <div className="right">
                <IconButton aria-label="Search" size="large" onClick={() => setshowSuggestions(!showSuggestions)}>
                  <SearchIcon />
                </IconButton>
                <Button variant="outlined" onClick={() => navigate("/signin")}>
                  Login
                </Button>
              </div>
            </>
          )}
          {showSuggestions && <SearchBar type={thisIsPc ? "pc" : "mb"} setShow={setshowSuggestions} />}
        </div>
      )}

      {thisIsPc && (
        <div className={`NavBar PC ${isScrolled ? "shadow" : ""}`}>
          <div className="left">
            <div className="logo">
              <Link to={"/"}>
                <img src="/logo/logo.png" alt="Logo" />
              </Link>
            </div>
            <div className="buttons">
              <Button variant="text" startIcon={<ShoppingBagIcon />}>
                Shop
              </Button>
            </div>
          </div>
          <SearchBar type={thisIsPc ? "pc" : "mb"} />
          <div className="right">
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              Login
            </Button>
          </div>
        </div>
      )}

      <div ref={contentRef} className="content">
        {props.children}
      </div>
    </>
  );
}

export default NavBar;

import React, { useContext, useEffect, useRef, useState } from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { Avatar, Badge } from "@mui/material";
import UserContext from "../../context/UserContext";
import HomeIcon from "@mui/icons-material/Home";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SettingsIcon from "@mui/icons-material/Settings";

function NavBar(props) {
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 766);
  const [isScrolled, setIsScorlled] = useState(false);
  const [cart, setCart] = useState(0);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();

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
                {user && <Avatar alt={user.email} src={user.photoURL} />}
                {!user && (
                  <Button variant="outlined" onClick={() => navigate("/signin")}>
                    Login
                  </Button>
                )}
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
              <Button variant="text" startIcon={<ShoppingBagIcon />} onClick={() => navigate("/shop")}>
                Shop
              </Button>
            </div>
          </div>
          <SearchBar type={thisIsPc ? "pc" : "mb"} />
          <div className="right">
            <Badge
              className="cart"
              onClick={() => {
                setCart((pre) => pre + 1);
              }}
              badgeContent={cart}
              color="primary"
            >
              <LocalGroceryStoreIcon />
            </Badge>
            {user && <Avatar alt={user.email} src={user.photoURL} />}
            {!user && (
              <Button variant="outlined" onClick={() => navigate("/signin")}>
                Login
              </Button>
            )}
          </div>
        </div>
      )}

      <div ref={contentRef} className="content" id="content">
        {props.children}
      </div>

      {!thisIsPc && (
        <div className="bottomNav ">
          <div className={`iconCont ${location.pathname === "/" ? "on" : ""}`} onClick={() => navigate("/")}>
            <HomeIcon color={`${location.pathname !== "/" ? "action" : ""}`} />
          </div>
          <div className={`iconCont ${location.pathname === "/shop" ? "on" : ""}`} onClick={() => navigate("/shop")}>
            <ShoppingBagIcon color={`${location.pathname !== "/shop" ? "action" : ""}`} />
          </div>
          <div className={`iconCont ${location.pathname === "/cart" ? "on" : ""}`} onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart} color="primary">
              <LocalGroceryStoreIcon color={`${location.pathname !== "/cart" ? "action" : ""}`} />
            </Badge>
          </div>
          <div className={`iconCont ${location.pathname === "/settings" ? "on" : ""}`} onClick={() => navigate("/settings")}>
            <SettingsIcon color={`${location.pathname !== "/settings" ? "action" : ""}`} />
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;

import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import { Avatar, Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { setNavBarData } from "../../redux/navBarSlice";

function NavBar(props) {
  const [showSuggestions, setshowSuggestionsState] = useState(false);
  const [currentPath, setcurrentPath] = useState(null);
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 766);
  const [isScrolled, setIsScorlled] = useState(false);
  const [cart, setCart] = useState(0);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const inNav = useSelector((state) => state.navBar.data);

  // eslint-disable-next-line
  const positon = location.pathname.split("/").filter((e) => {
    if (e) return e;
  });

  const setshowSuggestions = (state) => {
    if (state) {
      setcurrentPath(location.pathname);
      navigate(`${location.pathname}?search=show`);
    } else {
      setcurrentPath(null);
      navigate(currentPath ? currentPath : "/");
    }
  };

  useEffect(() => {
    setcurrentPath(location.pathname);
    if (location.search?.split("?")[1]?.split("&").includes("search=show")) {
      setshowSuggestionsState(true);
    } else {
      setshowSuggestionsState(false);
    }
  }, [location]);

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
        <div className={`NavBar MB ${isScrolled ? "shadow" : ""} `}>
          {!showSuggestions && (
            <>
              <div className="logo">
                {(!inNav || !inNav?.message) && (
                  <Link to={"/"}>
                    <img src="/logo/logo.png" alt="Logo" />
                  </Link>
                )}
                {inNav && inNav?.message && (
                  <div className="action">
                    <IconButton
                      aria-label="Back"
                      onClick={() => {
                        navigate(`${inNav?.path ? inNav?.path : "/"}`);
                        dispatch(setNavBarData({ path: null, message: null }));
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <div className="title">{inNav?.message}</div>
                  </div>
                )}
              </div>
              <div className="right">
                <IconButton aria-label="Search" size="large" onClick={() => setshowSuggestions(!showSuggestions)}>
                  <SearchIcon />
                </IconButton>
                {user && (
                  <Avatar className="Avathar" onClick={() => navigate("/settings")} alt={user.email} src={user.photoURL} />
                )}
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
        <div className={`NavBar PC ${isScrolled ? "shadow" : ""} `}>
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
            {user && (
              <Avatar className="Avathar" onClick={() => navigate("/settings")} alt={user.email} src={user.photoURL} />
            )}
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
          <div className={`iconCont ${positon[0] === "shop" ? "on" : ""}`} onClick={() => navigate("/shop")}>
            <ShoppingBagIcon color={`${positon[0] !== "shop" ? "action" : ""}`} />
          </div>
          <div className={`iconCont ${positon[0] === "cart" ? "on" : ""}`} onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart} color="primary">
              <LocalGroceryStoreIcon color={`${positon[0] !== "cart" ? "action" : ""}`} />
            </Badge>
          </div>
          <div className={`iconCont ${positon[0] === "settings" ? "on" : ""}`} onClick={() => navigate("/settings")}>
            <SettingsIcon color={`${positon[0] !== "settings" ? "action" : ""}`} />
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;

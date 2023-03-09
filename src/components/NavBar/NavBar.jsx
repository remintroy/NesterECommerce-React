import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { searchBackend } from "../../axios";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";

function NavBar(props) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setshowSuggestions] = useState(false);
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 766);
  const [isMoved, setIsScorlled] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const inputRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => setThisIsPc(window.innerWidth > 766));
    if (contentRef?.current) {
      contentRef?.current?.addEventListener("scroll", () => {
        setIsScorlled(contentRef?.current.offsetTop + contentRef?.current.scrollTop + contentRef?.current.clientTop > 0);
      });
    }
    return () => {
      window.removeEventListener("resize", () => {});
      contentRef?.current?.removeEventListener("scroll", () => {});
    };
  }, [contentRef]);

  // focus on search input
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [showSuggestions]);

  // search suggestions
  useEffect(() => {
    const getSuggestionsFromServer = async () => {
      try {
        const { data } = await searchBackend.get(`/api/search?q=${searchInputValue?.trim()}`);
        setSuggestions(data.message);
      } catch (error) {
        console.warn(error);
      }
    };
    getSuggestionsFromServer();
  }, [searchInputValue]);

  const ResultsComponent = () => {
    return (
      <>
        {suggestions.length > 0 ? (
          suggestions.map((e, i) => {
            if (i < 8)
              return (
                <li key={e.PID}>
                  <div className="aligner">
                    <SearchIcon />
                    <div className="textContent">{e.title}</div>
                  </div>
                  <NorthWestIcon />
                </li>
              );
          })
        ) : (
          <li>No result found !</li>
        )}
      </>
    );
  };

  return (
    <>
      {!thisIsPc && (
        <div className={`NavBar ${isMoved ? "shadow" : ""}`}>
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
          {showSuggestions && (
            <>
              <div className="searchSuggestions">
                <IconButton aria-label="Search" size="large" onClick={() => setshowSuggestions(!showSuggestions)}>
                  <ArrowBackIcon />
                </IconButton>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search"
                  value={searchInputValue}
                  onChange={(e) => {
                    setSearchInputValue(e.target.value?.trim().length === 0 ? "" : e.target.value);
                  }}
                />
                <IconButton aria-label="Search" size="large">
                  <SearchIcon />
                </IconButton>
              </div>
            </>
          )}
        </div>
      )}

      {thisIsPc && (
        <div className={`NavBar PC ${isMoved ? "shadow" : ""}`}>
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
          <div className="searchCont">
            <div className="suggestionAndInput">
              <input
                type="text"
                placeholder="Search"
                value={searchInputValue}
                onChange={(e) => {
                  setSearchInputValue(e.target.value?.trim().length === 0 ? "" : e.target.value);
                }}
              />
              <ul className="suggestionPannelPC">
                <ResultsComponent />
              </ul>
            </div>
            <IconButton aria-label="Search" size="large">
              <SearchIcon />
            </IconButton>
          </div>
          <div className="right">
            <Button variant="outlined" onClick={() => navigate("/signin")}>
              Login
            </Button>
          </div>
        </div>
      )}

      {!thisIsPc && showSuggestions && (
        <ul className="NavBarResults">
          <ResultsComponent />
        </ul>
      )}
      <div ref={contentRef} className="content">
        {props.children}
      </div>
    </>
  );
}

export default NavBar;

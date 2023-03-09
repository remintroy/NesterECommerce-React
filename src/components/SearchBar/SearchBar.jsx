import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { searchBackend } from "../../axios";

const Suggestions = ({ data, type, show = true }) => {
  if (!show) return "5";
  return (
    <ul className={`${type === "pc" ? "suggestionPannelPC" : "SearchBar NavBarResults"}`}>
      {data.length > 0 ? (
        data?.map((e, i) => {
          return (
            i < 8 && (
              <li key={e.PID}>
                <div className="aligner">
                  <SearchIcon />
                  <div className="textContent">{e.title}</div>
                </div>
                <NorthWestIcon />
              </li>
            )
          );
        })
      ) : (
        <li>No result found !</li>
      )}
    </ul>
  );
};

function SearchBar({ type, setShow }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const { data } = await searchBackend.get(`/api/search?q=${query?.trim()}`);
        setCache((cache) => {
          return { ...cache, [query]: data?.message };
        });
      } catch (error) {
        console.warn(error);
      }
    };
    if (!cache[query]) getDataFromServer();
    else setData(cache[query]);
  }, [query, cache]);

  const inputRef = useRef(null);

  if (type === "mb") {
    if (inputRef.current) inputRef.current.focus();
  }
  return (
    <>
      {type === "mb" && (
        <>
          <div className="SearchBar searchSuggestions">
            <IconButton aria-label="Search" size="large" onClick={() => setShow(false)}>
              <ArrowBackIcon />
            </IconButton>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value?.trim().length === 0 ? "" : e.target.value)}
            />
            <IconButton aria-label="Search" size="large">
              <SearchIcon />
            </IconButton>
          </div>
          <Suggestions data={data} />
        </>
      )}

      {type === "pc" && (
        <div className="SearchBar searchCont">
          <div className="suggestionAndInput">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value?.trim().length === 0 ? "" : e.target.value)}
            />
            <Suggestions data={data} type="pc" />
          </div>
          <IconButton aria-label="Search" size="large">
            <SearchIcon />
          </IconButton>
        </div>
      )}
    </>
  );
}

export default SearchBar;

import "./style.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SettingsNav = ({ title, path }) => {
  const navigate = useNavigate();
  const [thisIsPc, setThisIsPc] = useState(window.innerWidth < 860);

  useEffect(() => {
    window.addEventListener("resize", () => setThisIsPc(window.innerWidth < 860));
  }, []);

  return (
    <div className="SettingsNav">
      {thisIsPc && (
        <IconButton aria-label="delete" onClick={() => navigate(`${path ? path : "/settings"}`)}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <div className="title">{title ? title : "settings"}</div>
    </div>
  );
};

export default SettingsNav;

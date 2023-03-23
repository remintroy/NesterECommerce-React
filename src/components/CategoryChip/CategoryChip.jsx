import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CategoryChip.css";

function CategoryChip() {
  const category = [
    "aasdfasd",
    "badf",
    "casdf",
    "dasdf",
    "easdf",
    "askdjf",
    "lasdf",
    "asdfasf",
    "sdfasdfadf",
    "sdfsdf",
    "afefee", 
    "dfaee",
    "uyuefu",
    "sdfadf",
    "yuieoo",
    "asdfae",
    "asfsease",
    "affefef",
    "sdqasdfa",
    "asdfasdfsadf",
    "asdfsdf",
    "sdfsdfsdf",
  ];

  const [thisIsPc, setThisIsPc] = useState(window.innerWidth > 766);
  useEffect(() => {
    window.addEventListener("resize", () => setThisIsPc(window.innerWidth > 766));
  }, []);

  return (
    <div className={`CategoryChip ${thisIsPc ? "" : "mb"}`}>
      {/* {thisIsPc && <div className="title">Top Categorys</div>} */}
      <div className="listCont">
        <div className="list">
          {category.map((e) => {
            return <Chip key={e} label={`${e}`} onClick={() => console.log(`${e}`)} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryChip;

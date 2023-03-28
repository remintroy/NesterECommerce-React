import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SizeButton = () => {
  const [alignment, setAlignment] = React.useState("left");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const children = [
    <ToggleButton value="left" key="left">
      S
    </ToggleButton>,
    <ToggleButton value="center" key="center">
      M
    </ToggleButton>,
    <ToggleButton value="right" key="right">
      L
    </ToggleButton>,
    <ToggleButton value="justify" key="justify">
      XL
    </ToggleButton>,
  ];

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
      {children}
    </ToggleButtonGroup>
  );
};

export default SizeButton;

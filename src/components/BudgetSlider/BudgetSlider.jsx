import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";

function valuetext(value) {
  return `₹${value}000`;
}

export default function RangeSlider() {
  const budgetRange = useSelector(state => state.carBudgetRange);
  const [value, setValue] = React.useState([20, 80]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (budgetRange)
      setValue(budgetRange);
  }, [budgetRange]);

  return (
    <Box
      sx={{
        "& .css-187mznn-MuiSlider-root": {
          width: "13.7vw",
        },
      }}
    >
      <Slider
        getAriaLabel={() => "Budget Range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
      />
      <div className="slider-info">{value[0]}k - {value[1]}k</div>
    </Box>
  );
}

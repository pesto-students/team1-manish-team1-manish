import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { searchCarByFilters, setFilterCarBudget } from "../../Store/CarStore";
import { debounce } from "lodash";

function valuetext(value) {
  return `₹${value}000`;
}

export default function RangeSlider() {
  const dispatch = useDispatch();
  const budgetRange = useSelector(state => state.carBudgetRange);

  const handleChange = (event, newValue) => {
    dispatch(setFilterCarBudget(newValue));
    debouncedUpdateBudgetFilter(newValue);
  };

  const fetchCars = (value) => {
    dispatch(setFilterCarBudget(value))
    dispatch(searchCarByFilters())
  }
  const debouncedUpdateBudgetFilter = React.useCallback(debounce(fetchCars, 500), []);
  React.useEffect(() => {
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
        value={budgetRange}
        onChange={handleChange}
        valueLabelDisplay="off"
        getAriaValueText={valuetext}
      />
      <div className="slider-info">{budgetRange[0]}k - {budgetRange[1]}k</div>
    </Box>
  );
}

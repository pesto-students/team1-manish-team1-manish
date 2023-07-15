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
  const [value, setValue] = React.useState(budgetRange ? budgetRange : [20, 80]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    debouncedUpdateBudgetFilter(newValue)
  };

  const fetchCars = (value) => {
    dispatch(setFilterCarBudget(value))
    dispatch(searchCarByFilters())
  }
  const debouncedUpdateBudgetFilter = React.useCallback(debounce(fetchCars, 500), []);
  React.useEffect(() => {
  }, [budgetRange, value]);

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

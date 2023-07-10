import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  carBudgetRange,
  getCarModelsData,
  togglePage,
} from "../../Store/CarStore";
import { SellCarLandingPage } from "./SellCarLandingPage";
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const flagPage = useSelector((state) => state.flag);
  const carPriceRange = useSelector((state) => state.carBudgetRange);
  const carModels = useSelector((state) => {
    return state.carModelsData.carModels;
  });

  useEffect(() => {
    const dataFetch = async () => {
      await fetch("http://localhost:3000/cars")
        .then((res) => res.json())
        .then((res) => console.log(res));
    };
    dataFetch();
    dispatch(carBudgetRange());
    dispatch(getCarModelsData());
  }, []);

  return (
    <>
      <div className="landing-page">
        <div className="landing-page-div1">
          <img
            src="/Assets/landing-first-img.svg"
            alt="Landing page first image"
            className="landing-page-img"
          />
          <div className="text-inside-img">
            <p className="img-text">Car to cash in a few hours!</p>
            <button className="img-btn" onClick={() => dispatch(togglePage())}>
              {flagPage ? "Sell Car" : "Buy Car"}
            </button>
          </div>
        </div>
        {flagPage ? (
          <>
            <div className="landing-page-div2">
              <div className="landing-page-left-div">
                <p className="landing-page-heading">Looking For a Car ?</p>
                <div className="dream-car-search">
                  <p className="search-your-car">Search you dream car !</p>
                  <div className="search-car-drop-down">
                    <DropDown
                      selectName="Select Budget"
                      dataToShow={carPriceRange}
                    />
                    <DropDown
                      selectName="Select Brand"
                      dataToShow={["Audi", "BMW"]}
                    />
                    <DropDown
                      selectName="Select Vehicle"
                      dataToShow={["Audi", "BMW"]}
                    />
                  </div>
                  <button className="search-car-btn">Search</button>
                </div>
              </div>
              <div className="landing-page-right-div">
                <img
                  src="/Assets/looking-for-car-img.png"
                  alt="Looking for Car Image"
                />
              </div>
            </div>
            <div className="landing-page-div3">
              <p className="easy-steps">3 Easy Steps !</p>
              <div className="three-easy-step">
                <div className="variety-of-options">
                  <div className="vop-img">
                    <img
                      src="Assets/variety-of-options.png"
                      alt="variety of options"
                    />
                  </div>
                  <div className="vop-details">
                    <p className="vop-p1">Variety of options!</p>
                    <p className="vop-p2">
                      Search from a variety of options available.
                    </p>
                  </div>
                </div>
                <div className="choose-the-one">
                  <div className="cto-img">
                    <img src="Assets/choose-the-one.png" alt="choose the one" />
                  </div>
                  <div className="ctop-details">
                    <p className="cto-p1">Choose the one</p>
                    <p className="cto-p2">
                      Choose the one which fits you the best
                    </p>
                  </div>
                </div>
                <div className="easy-pay">
                  <div className="ep-img">
                    <img src="Assets/easy-pay.png" alt="easy pay" />
                  </div>
                  <div className="ep-details">
                    <p className="ep-p1">Easy Pay</p>
                    <p className="ep-p2">
                      Simply pay the the most affordable price which we have
                      decided for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <SellCarLandingPage />
        )}
        <div className="landing-page-div4">
          <p className="reviews-heading">Reviews</p>
          <div className="reviews-div">
            <div className="customers-review">
              <img src="/Assets/Component 1.png" alt="Customer Review" />
            </div>
            <div className="customers-review">
              <img src="/Assets/Component 1.png" alt="Customer Review" />
            </div>
            <div className="customers-review">
              <img src="/Assets/Component 1.png" alt="Customer Review" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function DropDown(props) {
  const { selectName, dataToShow } = props;
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl
      sx={{
        minWidth: 120,
        width: 283,
        "& .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
          {
            background: "#eaf2ff",
            border: "1px solid #d7e0f2",
            color: "#7b86b3",
          },
      }}
      size="small"
    >
      <InputLabel id="demo-select-small-label">{selectName}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label={selectName}
        onChange={handleChange}
      >
        {/* <MenuItem value={30}>Thirty</MenuItem> */}
        {dataToShow.map((el) => {
          // console.log(el.length);
          return (
            <MenuItem value={10} key={el + Math.random(1, 9)}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default LandingPage;

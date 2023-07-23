import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePage,
  getCarBrandsData,
  getCarTypeData,
  setFilterCarBudget,
  setFilterCarType,
  setFilterCarBrand,
} from "../../Store/CarStore";
import { SellCarLandingPage } from "./SellCarLandingPage";
import axios from "axios";
import "./LandingPage.css";
const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [budgetEvent, setBudgetEvent] = useState({
    showData: [
      { displayPrice: "Up to 5K", value: [0, 5] },
      { displayPrice: "5K to 10K", value: [5, 10] },
      { displayPrice: "10K to 20K", value: [11, 20] },
      { displayPrice: "20K to 50K", value: [21, 50] },
      { displayPrice: "Above 50K", value: [51, 100] },
    ],
    isStateUpdate: false,
    eventChange: null,
  });
  const [brandEvent, setBrandEvent] = useState({
    showData: [],
    isStateUpdate: false,
    eventChange: "",
  });
  const [typeEvent, setTypeEvent] = useState({
    showData: [],
    isStateUpdate: false,
    eventChange: "",
  });
  const flagPage = useSelector((state) => state.flag);

  const getBrandData = async () => {
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/brands/${budgetEvent?.eventChange[0]}000/${budgetEvent?.eventChange[1]}000`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/brands/${budgetEvent?.eventChange[0]}000/${budgetEvent?.eventChange[1]}000`;
    await axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          let updatedBrand = {};
          updatedBrand = { showData: res.data };
          setBrandEvent((res) => ({
            ...res,
            ...updatedBrand,
          }));
          setBudgetEvent((res) => ({ ...res, ...{ isStateUpdate: false } }));
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const getCarType = async () => {
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/brands/${budgetEvent?.eventChange[0]}000/${budgetEvent?.eventChange[1]}000/types/${brandEvent.eventChange}`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/brands/${budgetEvent?.eventChange[0]}000/${budgetEvent?.eventChange[1]}000/types/${brandEvent.eventChange}`;

    await axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          let updatedType = {};
          updatedType = { showData: res.data };
          setTypeEvent((res) => ({
            ...res,
            ...updatedType,
          }));
          setBrandEvent((res) => ({ ...res, ...{ isStateUpdate: false } }));
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleCarSearch = async () => {
    setIsLoading(true);
    dispatch(getCarBrandsData());
    dispatch(getCarTypeData());
    setTimeout(() => {
      dispatch(setFilterCarBrand(brandEvent.eventChange));
      dispatch(setFilterCarType(typeEvent.eventChange));
      dispatch(setFilterCarBudget(budgetEvent.eventChange));
      navigate("/buy-car");
      setIsLoading(false);
    }, 2500);
  };

  useEffect(() => {
    let flagBudget = budgetEvent.isStateUpdate;
    let flagBrand = brandEvent.isStateUpdate;

    if (flagBudget) {
      getBrandData();
    }
    if (flagBrand) {
      getCarType();
    }
  }, [budgetEvent, brandEvent]);

  return (
    <>
      {isLoading ? (
        <div className="circular-loader">
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}
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
                      eventToHandle={budgetEvent}
                      setEventToHandle={setBudgetEvent}
                    />
                    <DropDown
                      selectName="Select Brand"
                      eventToHandle={brandEvent}
                      setEventToHandle={setBrandEvent}
                    />
                    <DropDown
                      selectName="Select Vehicle Type"
                      eventToHandle={typeEvent}
                      setEventToHandle={setTypeEvent}
                    />
                  </div>
                  <button className="search-car-btn" onClick={handleCarSearch}>
                    Search
                  </button>
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
      </div>
    </>
  );
};

function DropDown(props) {
  const { selectName, eventToHandle, setEventToHandle } = props;
  const handleChange = (event) => {
    let updatedValue = {};
    updatedValue = { eventChange: event.target.value, isStateUpdate: true };

    setEventToHandle((eventToHandle) => ({
      ...eventToHandle,
      ...updatedValue,
    }));
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
        value={eventToHandle.eventChange}
        label={selectName}
        onChange={handleChange}
      >
        {!eventToHandle.showData
          ? ""
          : eventToHandle.showData.map((el) => {
              if (selectName === "Select Budget") {
                return (
                  <MenuItem value={el.value} key={el + Math.random(1, 9)}>
                    {el.displayPrice}
                  </MenuItem>
                );
              } else if (selectName === "Select Brand") {
                return (
                  <MenuItem value={el.brand} key={el + Math.random(1, 9)}>
                    {el.brand}
                  </MenuItem>
                );
              } else if (selectName === "Select Vehicle Type") {
                return (
                  <MenuItem value={el.type} key={el + Math.random(1, 9)}>
                    {el.type}
                  </MenuItem>
                );
              }
            })}
      </Select>
    </FormControl>
  );
}

export default LandingPage;

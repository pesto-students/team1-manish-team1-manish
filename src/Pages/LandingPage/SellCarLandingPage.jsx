import React, { useEffect, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCarBrandsData } from "../../Store/CarStore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./LandingPage.css";

export function SellCarLandingPage() {
  const dispatch = useDispatch();

  // const carYear = useSelector((state) => state.purchasedCarYear);
  const carBrands = useSelector((state) => {
    return state.carBrandData.carBrand;
  });
  const carOwners = useSelector((state) => {
    return state.carOwnerShip;
  });
  const carFuel = useSelector((state) => {
    return state.carFuelType;
  });
  const carRegState = useSelector((state) => {
    return state.carRegState;
  });

  const [brandEvent, setBrandEvent] = useState({
    showData: carBrands,
    isStateUpdate: false,
    eventChange: "",
  });
  const [modelEvent, setModelEvent] = useState({
    showData: [],
    isStateUpdate: false,
    eventChange: "",
  });
  const [yearEvent, setYearEvent] = useState({
    showData: [],
    isStateUpdate: false,
    eventChange: "",
  });
  const [variantEvent, setVariantEvent] = useState({
    showData: [],
    isStateUpdate: false,
    eventChange: "",
  });
  const [fuelTypeEvent, setFuelTypeEvent] = useState({
    showData: carFuel,
    isStateUpdate: false,
    eventChange: "",
  });
  const [ownerShipEvent, setOwnerShipEvent] = useState({
    showData: carOwners,
    isStateUpdate: false,
    eventChange: "",
  });
  const [carRegStateEvent, setCarRegStateEvent] = useState({
    showData: carRegState,
    isStateUpdate: false,
    eventChange: "",
  });

  const handleSellCarSubmit = () => {};

  const getCarModelData = async () => {
    const url = `http://localhost:3000/cars-api/make_id/${brandEvent.eventChange}/year-name`;
    await axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_CORS_URL
            : process.env.REACT_APP_PROD_CORS_URL,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          let updatedModel = {};
          updatedModel = { showData: res.data };
          setModelEvent((res) => ({
            ...res,
            ...updatedModel,
          }));
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const getCarYearData = async () => {
    const url = `http://localhost:3000/cars-api/make_id/${brandEvent.eventChange}/year-name`;
    await axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_CORS_URL
            : process.env.REACT_APP_PROD_CORS_URL,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          let updatedModel = {};
          updatedModel = { showData: res.data };
          setYearEvent((res) => ({
            ...res,
            ...updatedModel,
          }));
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const getCarVarientData = async () => {
    const url = `http://localhost:3000/cars-api//make_id/${brandEvent.eventChange}/year/2022/name/${modelEvent.eventChange}/trim`;
    await axios({
      method: "get",
      url: url,
      headers: {
        "Access-Control-Allow-Origin":
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_CORS_URL
            : process.env.REACT_APP_PROD_CORS_URL,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          let updatedModel = {};
          updatedModel = { showData: res.data };
          setVariantEvent((res) => ({
            ...res,
            ...updatedModel,
          }));
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    let flagBrand = brandEvent.isStateUpdate;
    let flagModel = modelEvent.isStateUpdate;
    let flagYear = yearEvent.isStateUpdate;
    if (!carBrands.length) {
      dispatch(getCarBrandsData());
    } else {
      setBrandEvent((state) => ({
        ...state,
        showData: carBrands,
      }));
    }

    if (flagBrand) {
      getCarModelData();
    }
    if (flagModel) {
      getCarYearData();
    }
    if (flagYear) {
      getCarVarientData();
    }
  }, [
    carBrands,
    brandEvent.eventChange,
    modelEvent.eventChange,
    yearEvent.eventChange,
    variantEvent.eventChange,
  ]);

  return (
    <div>
      <div className="sell-car-landing-page-div2">
        <p className="landing-page-heading sell-car-div-heading">
          Sell your car!
        </p>
        <div className="sell-car-details">
          <div className="enter-sell-car-detail">
            <p className="search-your-car sell-car-header">
              Enter Selling Details
            </p>
            <div className="enter-sell-car-drop-down">
              <div className="car-drop-down-1">
                <DropDown
                  selectName="Select Brand"
                  eventToHandle={brandEvent}
                  setEventToHandle={setBrandEvent}
                />
                <DropDown
                  selectName="Select Model"
                  eventToHandle={modelEvent}
                  setEventToHandle={setModelEvent}
                />
              </div>
              <div className="car-drop-down-2">
                <DropDown
                  selectName="Select Year"
                  eventToHandle={yearEvent}
                  setEventToHandle={setYearEvent}
                />
                <DropDown
                  selectName="Select Variant"
                  eventToHandle={variantEvent}
                  setEventToHandle={setVariantEvent}
                />
              </div>
              <div className="car-drop-down-2">
                <DropDown
                  selectName="Select Fuel Type"
                  eventToHandle={fuelTypeEvent}
                  setEventToHandle={setFuelTypeEvent}
                />
                <DropDown
                  selectName="Select Ownership"
                  eventToHandle={ownerShipEvent}
                  setEventToHandle={setOwnerShipEvent}
                />
              </div>
              <div className="car-drop-down-2">
                <DropDown
                  selectName="Select Reg. State"
                  eventToHandle={carRegStateEvent}
                  setEventToHandle={setCarRegStateEvent}
                />
                <TextFieldSizes />
                {/* <select name="pets" id="pet-select">
                  <option value="">Select Kms Driven</option>
                  <option value="dog">Dog</option>
                </select> */}
              </div>
              <div className="car-drop-down-2">
                <select name="pets" id="pet-select">
                  <option value="">Select Car Location</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Nearest RTO Office</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
            </div>
          </div>
          <div className="upload-img-div">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={(event) => {
                setFiles(event.target.files);
              }}
            />
          </div>
        </div>
        <div className="submit-btn">
          <button className="search-car-btn" onClick={handleSellCarSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className="landing-page-div3">
        <p className="easy-steps">3 Easy Steps !</p>
        <div className="three-easy-step">
          <div className="variety-of-options">
            <div className="vop-img">
              <img src="Assets/choose-the-one.png" alt="variety of options" />
            </div>
            <div className="vop-details">
              <p className="vop-p1">Register Car Details</p>
              <p className="vop-p2">
                Provide some necessary details related to your vehicle.
              </p>
            </div>
          </div>
          <div className="choose-the-one">
            <div className="cto-img">
              <img src="Assets/car-inspection.png" alt="choose the one" />
            </div>
            <div className="ctop-details">
              <p className="cto-p1">Car Inspection</p>
              <p className="cto-p2">
                Our car expert physically verifies your car’s condition and
                provide the final offer
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
                Amount will be directly transferred to your bank account before
                your car is picked up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
              if (selectName === "Select Brand") {
                return (
                  <MenuItem value={el.make_id} key={el + Math.random(1, 9)}>
                    {el.make_id}
                  </MenuItem>
                );
              } else if (selectName === "Select Model") {
                return (
                  <MenuItem value={el.name} key={el + Math.random(1, 9)}>
                    {el.name}
                  </MenuItem>
                );
              } else if (selectName === "Select Year") {
                return (
                  <MenuItem value={el.year} key={el + Math.random(1, 9)}>
                    {el.year}
                  </MenuItem>
                );
              } else if (selectName === "Select Variant") {
                return (
                  <MenuItem value={el.trim} key={el + Math.random(1, 9)}>
                    {el.trim}
                  </MenuItem>
                );
              } else if (selectName === "Select Fuel Type") {
                return (
                  <MenuItem value={el} key={el + Math.random(1, 9)}>
                    {el}
                  </MenuItem>
                );
              } else if (selectName === "Select Ownership") {
                return (
                  <MenuItem value={el} key={el + Math.random(1, 9)}>
                    {el}
                  </MenuItem>
                );
              } else if (selectName === "Select Reg. State") {
                return (
                  <MenuItem value={el} key={el + Math.random(1, 9)}>
                    {el}
                  </MenuItem>
                );
              }
            })}
      </Select>
    </FormControl>
  );
}

export default function TextFieldSizes() {
  return (
    <Box
      component="form"
      sx={{
        width: 283,
        "& .MuiTextField-root": {},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue=""
          size="small"
        />
      </div>
    </Box>
  );
}

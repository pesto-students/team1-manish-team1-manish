import React, { useEffect, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  getCarBrandsData,
  setCarModelData,
  setCarVariantData,
} from "../../Store/CarStore";
import "./LandingPage.css";

export function SellCarLandingPage() {
  const dispatch = useDispatch();
  const carBrands = useSelector((state) => state.carBrandData.carBrand);
  const carModels = useSelector((state) => {
    return state.carModelData.carModel;
  });
  const carYear = useSelector((state) => state.purchasedCarYear);
  const carVariant = useSelector((state) => {
    console.log(state);
    return state.carVariantData;
  });
  const [files, setFiles] = useState(null);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [year, setYear] = useState(null);
  const [variant, setVariant] = useState(null);

  const handleSellCarSubmit = () => {};

  useEffect(() => {
    dispatch(getCarBrandsData());
    // console.log(carVariant);
  }, []);

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
                  dataToShow={carBrands}
                  eventChange={setBrand}
                />
                <DropDown
                  selectName="Select Model"
                  dataToShow={carModels}
                  eventChange={setModel}
                />
              </div>
              <div className="car-drop-down-2">
                <DropDown
                  selectName="Select Variant"
                  dataToShow={carVariant}
                  eventChange={setVariant}
                />

                <DropDown
                  selectName="Select Year"
                  dataToShow={carYear}
                  eventChange={setYear}
                />
              </div>
              <div className="car-drop-down-2">
                <DropDown
                  selectName="Select Fuel Type"
                  dataToShow={carYear}
                  eventChange={setYear}
                />
                <DropDown
                  selectName="Select Ownership"
                  dataToShow={carYear}
                  eventChange={setYear}
                />
              </div>
              <div className="car-drop-down-2">
                <DropDown
                  selectName="Select Reg. State"
                  dataToShow={carYear}
                  eventChange={setYear}
                />
                <select name="pets" id="pet-select">
                  <option value="">Select Kms Driven</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="car-drop-down-2">
                <select name="pets" id="pet-select">
                  <option value="">Select Car Location</option>
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
  const { selectName, dataToShow, eventChange } = props;
  const [selectOption, setSelectOption] = React.useState(" ");
  const brand = useRef();
  const model = useRef();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectOption(event.target.value);
    eventChange(event.target.value);
    if (selectName === "Select Brand") {
      brand.current = event.target.value;
    } else if (selectName === "Select Model") {
      model.current = event.target.value;
    }
  };

  useEffect(() => {
    const getCarModelData = async () => {
      const url = `http://localhost:3000/cars-api/make_id/${selectOption}/year-name`;
      await axios({
        method: "get",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
        },
      })
        .then((res) => res.data)
        .then((res) => {
          dispatch(setCarModelData(res));
        });
    };
    const getCarVariant = async () => {
      console.log(brand, model);
      const url = `http://localhost:3000/cars-api/make_id/${brand}/name/${model}/trim`;
      await axios({
        method: "get",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
        },
      })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          dispatch(setCarVariantData(res));
        });
    };
    if (selectName === "Select Brand") {
      getCarModelData();
    }
    if (selectName === "Select Model") {
      getCarVariant();
    }
  }, [selectOption]);

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
        value={selectOption}
        label={selectName}
        onChange={handleChange}
      >
        {!dataToShow
          ? ""
          : dataToShow.map((el) => {
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
                  <MenuItem value={el} key={el + Math.random(1, 9)}>
                    {el}
                  </MenuItem>
                );
              } else if (selectName === "Select Variant") {
                return (
                  <MenuItem value={el.trim} key={el + Math.random(1, 9)}>
                    {el.trim}
                  </MenuItem>
                );
              }
            })}
      </Select>
    </FormControl>
  );
}

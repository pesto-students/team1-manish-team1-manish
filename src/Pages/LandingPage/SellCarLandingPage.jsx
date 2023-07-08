import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { getCarModelsData } from "../../Store/CarStore";
import "./LandingPage.css";

export function SellCarLandingPage() {
  const dispatch = useDispatch();
  const carModels = useSelector((state) => state.carModelsData.carModels);
  const [files, setFiles] = useState(null);
  const handleSellCarSubmit = () => {};

  useEffect(() => {
    dispatch(getCarModelsData());
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
                <DropDown selectName="Select Brand" dataToShow={carModels} />
                <select name="pets" id="pet-select">
                  <option value="">Select Reg. State</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="car-drop-down-2">
                <DropDown selectName="Select Model" dataToShow={carModels} />
                <select name="pets" id="pet-select">
                  <option value="">Select Year & Model</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Ownership</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="car-drop-down-2">
                <select name="pets" id="pet-select">
                  <option value="">Select Fual Type</option>
                  <option value="dog">Dog</option>
                </select>
                <select name="pets" id="pet-select">
                  <option value="">Select Kms Driven</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="car-drop-down-2">
                <select name="pets" id="pet-select">
                  <option value="">Select Variant</option>
                  <option value="dog">Dog</option>
                </select>
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
  const { selectName, dataToShow } = props;
  const [selectedInput, setSelectedInput] = React.useState("");

  const handleChange = (event) => {
    setSelectedInput(event.target.value);
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
        value={selectedInput}
        label={selectName}
        onChange={handleChange}
      >
        {/* <MenuItem value={30}>Thirty</MenuItem> */}
        {dataToShow.map((el) => {
          // console.log(el.length);
          return (
            <MenuItem value={10} key={el.make_id}>
              {el.make_display}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

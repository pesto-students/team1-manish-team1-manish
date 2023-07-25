import React, { useEffect, useRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getSellCarBrandsData } from "../../Store/CarStore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Snackbar } from "@mui/material";
import "./LandingPage.css";
import { useNavigate } from "react-router";
import { carFuelType, carOwnerShip, carRegistrationState } from "../../utility/StaticDropdownContent";
import { hasEmptyValues } from "../../utility/HelperFunctions";
const { NODE_ENV, REACT_APP_DEV_BACKEND_BASE_URL, REACT_APP_PROD_BACKEND_BASE_URL, REACT_APP_DEV_CORS_URL, REACT_APP_PROD_CORS_URL } = process.env;

export function SellCarLandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState({ type: 0, message: "" });
  const resetToast = () => {
    setShowToast({ type: 0, message: "" });
  };

  const userDetail = useSelector((state) => {
    return state.userDetails;
  });
  const carBrands = useSelector((state) => {
    return state.sellCarBrandData.carBrand;
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
    showData: carFuelType,
    isStateUpdate: false,
    eventChange: "",
  });
  const [ownerShipEvent, setOwnerShipEvent] = useState({
    showData: carOwnerShip,
    isStateUpdate: false,
    eventChange: "",
  });
  const [carRegStateEvent, setCarRegStateEvent] = useState({
    showData: carRegistrationState,
    isStateUpdate: false,
    eventChange: "",
  });

  const [totalKMSDriven, setTotalKMSDriven] = useState(0);
  const [carPinCode, setCarPinCode] = useState("000000");
  const [nearRTOoffice, setnearRTOoffice] = useState("");
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState({ array: [] });
  const [selectedCarData, setSelectedCarData] = useState([]);

  const handleSellCarSubmit = async () => {
    const sellCarData = {
      brand: brandEvent.eventChange,
      year: yearEvent.eventChange,
      model: modelEvent.eventChange,
      fuelType: fuelTypeEvent.eventChange,
      fuelCapacity: selectedCarData[0]?.fuel_cap_l ?? "NA",
      registrationYear: yearEvent.eventChange,
      engine: selectedCarData[0]?.engine_cc,
      variant: variantEvent.eventChange,
      ownership: ownerShipEvent.eventChange,
      kmDriven: totalKMSDriven,
      transmission: selectedCarData[0]?.transmission_type,
      transmissionShort: selectedCarData[0]?.transmission_type?.substring(0, 5),
      insurance: "NA",
      pinCode: carPinCode,
      registrationState: carRegStateEvent.eventChange,
      city: "New Delhi",
      registrationNumber: "BR01CN3473",
      sellerId: userDetail.id,
      buyerId: null,
      nearestRtoOffice: nearRTOoffice,
      price: Math.ceil(Math.random() * (50000 - 5000) + 5000),
      type: selectedCarData[0]?.body,
      tags: ["Best Sellar"],
      images: image.array,
      carApiId: selectedCarData[0]?.id,
    };
    if (!userDetail.id) {
      setShowToast({ type: 2, message: "Login to sell a car !" });
      return;
    }
    if (hasEmptyValues(sellCarData, 'buyerId') || !image.array.length) {
      setShowToast({ type: 2, message: "Please fill all details !" });
      return;
    }
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars`;

    await axios({
      method: "post",
      url: url,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: sellCarData,
    })
      .then((res) => {
        if (res.status == 201) {
          setSelectedCarData(res.data);
          setShowToast({ type: 1, message: "Car Details Added Sucessfully!" });
          setTimeout(() => navigate("/buy-car"), 2500);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const getCarModelData = async () => {
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars-api/make_id/${brandEvent.eventChange}/year-name`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars-api/make_id/${brandEvent.eventChange}/year-name`;
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
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars-api/make_id/${brandEvent.eventChange}/year-name`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars-api/make_id/${brandEvent.eventChange}/year-name`;
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
          let updatedModel = {};
          updatedModel = { showData: [res.data[0]] };
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
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars-api/make_id/${brandEvent.eventChange}/year/2022/name/${modelEvent.eventChange}/trim`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars-api//make_id/${brandEvent.eventChange}/year/2022/name/${modelEvent.eventChange}/trim`;
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
  const getSelectedCarDetail = async () => {
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars-api/make_id/${brandEvent.eventChange}/name/${modelEvent.eventChange}/trim/${variantEvent.eventChange}`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars-api/make_id/${brandEvent.eventChange}/name/${modelEvent.eventChange}/trim/${variantEvent.eventChange}`;

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
          setSelectedCarData(res.data);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const handleUpload = async () => {
    if (!files) {
      return;
    }
    if (!userDetail.id) {
      setShowToast({ type: 2, message: "Login to sell a car !" });
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "car-image");
      formData.append("cloud_name", "dlbeskesi");
      const url = `https://api.cloudinary.com/v1_1/dlbeskesi/image/upload`;

      await axios
        .post(url, formData, {
          onUploadProgress: (ProgressEvent) => {
            console.log(ProgressEvent);
          },
        })
        .then((res) => {
          const data = res.data;
          const imageUrl = data.secure_url;
          let specficObjectInArray = image.array;
          specficObjectInArray.push(imageUrl);
          const newObj = { ...image, specficObjectInArray };
          setImage(newObj);
        })
        .catch((err) => console.log(err));
    }
    setShowToast({ type: 1, message: "Image Uploaded Successfull!" });
  };

  useEffect(() => {
    let flagBrand = brandEvent.isStateUpdate;
    let flagModel = modelEvent.isStateUpdate;
    let flagYear = yearEvent.isStateUpdate;
    if (!carBrands.length) {
      dispatch(getSellCarBrandsData());
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
    if (flagBrand && flagModel && variantEvent.isStateUpdate) {
      getSelectedCarDetail();
    }
  }, [
    carBrands,
    brandEvent.eventChange,
    modelEvent.eventChange,
    yearEvent.eventChange,
    variantEvent.eventChange,
    image,
  ]);

  return (
    <div>
      <Snackbar
        className="toastify-class"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast.type == 2}
        autoHideDuration={5000}
        onClose={resetToast}
      >
        <Alert onClose={resetToast} severity="error" sx={{ width: "100%" }}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <Snackbar
        className="toastify-class"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showToast.type == 1}
        autoHideDuration={2500}
        onClose={resetToast}
      >
        <Alert onClose={resetToast} severity="success" sx={{ width: "100%" }}>
          {showToast.message}
        </Alert>
      </Snackbar>
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
                <TextFieldSizes
                  textName="Kms Driven"
                  inputValue={setTotalKMSDriven}
                />
              </div>
              <div className="car-drop-down-2">
                <DropDown
                  selectName="Select Reg. State"
                  eventToHandle={carRegStateEvent}
                  setEventToHandle={setCarRegStateEvent}
                />
                <TextFieldSizes
                  textName="Car Location (Pincode)"
                  inputValue={setCarPinCode}
                />
              </div>
              <div className="car-drop-down-2">
                <TextFieldSizes
                  textName="Nearest RTO Office"
                  inputValue={setnearRTOoffice}
                />
                <DropDown
                  selectName="Select Ownership"
                  eventToHandle={ownerShipEvent}
                  setEventToHandle={setOwnerShipEvent}
                />
              </div>
            </div>
          </div>
          <div className="upload-img-div">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={(event) => setFiles(event.target.files)}
            />
            <button className="upload-button" onClick={handleUpload}>Upload</button>
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
      disabled={!eventToHandle.showData.length}
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
                <MenuItem value={el.brand} key={el + Math.random(1, 9)}>
                  {el.brand}
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

export default function TextFieldSizes(props) {
  const { textName, inputValue } = props;
  return (
    <Box
      component="form"
      sx={{
        width: 283,
        "& .MuiTextField-root": {},
        "& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root": {
          minWidth: "283px",
        },
        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
          background: "#eaf2ff",
          border: "1px solid #d7e0f2",
          color: "#7b86b3",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          label={textName}
          id="outlined-size-small"
          defaultValue=""
          size="small"
          onChange={(e) => {
            inputValue(e.target.value);
          }}
        />
      </div>
    </Box>
  );
}

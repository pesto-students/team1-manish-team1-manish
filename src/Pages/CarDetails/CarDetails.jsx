/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CarDetails.css";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import IconButtons from "../../components/Button/IconButton";
const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

const CarDetails = ({ carId, resetCarId }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const [carData, setCarData] = useState(null);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isBookMarkSet, setIsBookMarkSet] = useState(false);
  const [isImageFading, setIsImageFading] = useState([0, true]);
  const [moreOverviewToggle, setMoreOverviewToggle] = useState(false);
  const [moreFeatureToggle, setMoreFeatureToggle] = useState(false);
  const [moreSpecificationToggle, setMoreSpecificationToggle] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [showToast, setShowToast] = useState({ type: 0, message: "" });
  const [carSellStatus, setCarSellStatus] = useState("BUY");
  const [orderDetails, setOrderDetails] = useState(null);
  const resetToast = () => {
    setShowToast({ type: 0, message: "" });
  };
  let timeOutId = useRef(false);
  const bookmarkToggle = () => {
    if (!userDetails.id) {
      setShowToast({ type: 2, message: "Login to add car to the wishlist !" });
      return;
    }
    if (isBookMarked) {
      removeBookmark();
    } else {
      addBookmark();
    }
  };
  const manualNextImage = () => {
    clearTimeout(timeOutId.current);
    if (isImageFading[0] > carData.carOverview.Images.length - 2) {
      setIsImageFading([0, false]);
    } else {
      setIsImageFading((value) => [value[0] + 1, false]);
    }
  };
  const manualPrevImage = () => {
    clearTimeout(timeOutId.current);
    if (isImageFading[0] < 1) {
      setIsImageFading([carData.carOverview.Images.length - 1, false]);
    } else {
      setIsImageFading((value) => [value[0] - 1, false]);
    }
  };

  const addBookmark = async () => {
    await axios({
      method: "post",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: {
        bookmarkId: carId,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setShowToast({ type: 1, message: "Car added to the wishlist !" });
          setIsBookMarked(true);
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };

  const removeBookmark = async () => {
    await axios({
      method: "delete",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/users/${userDetails.id}/bookmarks`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
      data: {
        bookmarkId: `${carId}`,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setShowToast({ type: 1, message: "Car removed from the wishlist !" });
          setIsBookMarked(false);
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };

  const fetchCarDetails = async () => {
    await axios({
      method: "get",
      url:
        NODE_ENV == "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/details/ids/${carId}`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/details/ids/${carId}`,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setCarData(response.data);
        }
      })
      // Catching and returning error message if the specified place is invalid.
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };

  const createOrder = async () => {
    const url =
      NODE_ENV === "development"
        ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/order_id/price/${carData.carOverview.Price}`
        : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/order_id/price/${carData.carOverview.Price}`;

    await axios({
      url: url,
      method: "get",
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin":
          NODE_ENV === "development"
            ? REACT_APP_DEV_CORS_URL
            : REACT_APP_PROD_CORS_URL,
      },
    })
      .then((res) => {
        if (res.status == 200) {
          setOrderDetails(res.data);
        }
      })
      .catch((error) => {
        setShowToast({
          type: 2,
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };

  const handleBuyCar = async (event) => {
    if (carSellStatus === "BUY") {
      await createOrder();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
        amount: carData.carOverview.Price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Car Bazaar", //your business name
        description: "Test Transaction",
        image: "./Assets/Logo.svg",
        order_id: orderDetails?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (res) {
          if (res.razorpay_payment_id) {
            const url =
              NODE_ENV === "development"
                ? `${REACT_APP_DEV_BACKEND_BASE_URL}/cars/ids/${carId}/buy`
                : `${REACT_APP_PROD_BACKEND_BASE_URL}/cars/ids/${carId}/buy`;

            await axios({
              method: "post",
              url: url,
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Origin":
                  NODE_ENV === "development"
                    ? REACT_APP_DEV_CORS_URL
                    : REACT_APP_PROD_CORS_URL,
              },
              data: {
                buyerId: userDetails.id,
              },
            })
              .then((response) => {
                if (response.status == 200) {
                  setShowToast({
                    type: 1,
                    message: "Car Purchased Successfully",
                  });
                  setCarSellStatus("BOUGHT");
                }
              })
              // Catching and returning error message if the specified place is invalid.
              .catch((error) => {
                setShowToast({
                  type: 2,
                  message: error.response.data.message
                    ? error.response.data.message
                    : "Something went wrong !",
                });
              });
          }
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: userDetails.name, //your customer's name
          email: userDetails.email,
          contact: userDetails.phone_no, //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      try {
        const rzp1 = new Razorpay(options);
        rzp1.open();
        event.preventDefault();
      } catch (error) {
        setShowToast({
          type: 2,
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      }
    }
  };

  useEffect(() => {
    if (timeOutId.current) {
      clearTimeout(timeOutId.current);
      timeOutId.current = null;
    }
    if (userDetails.id && !isBookMarkSet) {
      setIsBookMarked(
        userDetails?.bookmark_ids?.includes(`${carId}`) ? true : false
      );
      setIsBookMarkSet(true);
    }
    if (!carData) {
      //Backend API call for fetching carDetails
      fetchCarDetails();
    } else {
      if (!timeOutId.current) {
        timeOutId.current = setTimeout(() => {
          if (isImageFading[0] > carData.carOverview.Images.length - 2) {
            setIsImageFading([0, !isImageFading[1]]);
          } else {
            setIsImageFading((value) => [value[0] + 1, !value[1]]);
          }
        }, 6000);
      }
    }
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const updateBuyButton = () => {
      if (carData?.carOverview?.BuyerId === userDetails?.id) {
        setCarSellStatus("Bought");
      } else if (carData?.carOverview?.BuyerId) {
        setCarSellStatus("Sold Out");
      }
    };
    updateBuyButton();

    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [carData, isImageFading, scrollDirection, userDetails, isBookMarkSet]);

  return (
    <>
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
      <div id="style-1" className="car-details">
        <div className="car-details-back-btn">
          <IconButtons
            actionToDo={() => {
              resetCarId(null);
            }}
          />
        </div>
        <div className="car-preview">
          {!carData ? (
            <>
              <div className="shimmer">
                <div className="shimmering"></div>
                <div className="shimmering"></div>
                <div className="shimmering"></div>
              </div>
              <div className="car-photos shimmering"></div>
            </>
          ) : (
            <>
              <div className="car-info">
                <div className="car-description darker-font">
                  <div className="car-name">
                    <p className="">
                      {carData.carOverview.Year} {carData.carOverview.Brand}{" "}
                      {carData.carOverview.Model}{" "}
                      {carData.carOverview.FualCapacity}L{" "}
                      {carData.carOverview.Type} {carData.carOverview.Variant}{" "}
                      {carData.carOverview.TransmissionShort}
                    </p>
                  </div>
                  <div className="car-highlights">
                    <ul>
                      <li>{carData.carOverview.KmDriven}</li>
                      <li>{carData.carOverview.FualType}</li>
                      <li>{carData.carOverview.Ownership}</li>
                      <li>Rs. {carData.carOverview.Price}</li>
                    </ul>
                  </div>
                </div>
                <div className="car-interactive-button">
                  <button className="darker-btn" onClick={bookmarkToggle}>
                    {isBookMarked ? (
                      <Icon icon="iconamoon:bookmark-fill" />
                    ) : (
                      <Icon icon="iconamoon:bookmark-bold" />
                    )}
                  </button>
                  <button
                    className="darker-btn"
                    onClick={handleBuyCar}
                    disabled={carData.carOverview.SellerId === userDetails.id}
                  >
                    <p>{carSellStatus}</p>
                  </button>
                </div>
              </div>
              <div className="car-photos">
                <div className="next-image" onClick={manualNextImage}>
                  <Icon icon="ic:round-greater-than" />
                </div>
                <div className="prev-image" onClick={manualPrevImage}>
                  <Icon icon="ic:round-less-than" />
                </div>
                <img
                  className={isImageFading[1] ? "easeload" : ""}
                  src={carData.carOverview.Images[isImageFading[0]]}
                />
              </div>
            </>
          )}
        </div>
        {!carData ? (
          <>
            <div className="shimmer-body">
              <h3 className="div-header">Car Overview</h3>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
            </div>
            <div className="shimmer-body">
              <h3 className="div-header">Features</h3>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
            </div>
            <div className="shimmer-body">
              <h3 className="div-header">Specifications</h3>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
              <div className="shimmering-effect"></div>
            </div>
          </>
        ) : (
          <>
            <div className="info-body">
              <h3 className="div-header">Car Overview</h3>
              <div className="info-content">
                <div className="overview-content">
                  <div className="content-key">Registration Year</div>
                  <div className="content-key">Fuel Type</div>
                  <div className="content-key">Kms Driven</div>
                  <div className="content-key">Ownership</div>
                  <div className="content-key">Transmission</div>
                </div>
                <div className="overview-content">
                  <div className="content-value">
                    {carData.carOverview.RegistrationYear}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.FualType}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.KmDriven}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.Ownership}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.Transmission}
                  </div>
                </div>
                <div className="overview-content">
                  <div className="content-key">Insaurance</div>
                  <div className="content-key">Variant</div>
                  <div className="content-key">RTO</div>
                  <div className="content-key">Engine</div>
                  <div className="content-key">Manufaturing Yr</div>
                </div>
                <div className="overview-content">
                  <div className="content-value">
                    {carData.carOverview.Insaurance}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.Variant}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.NearestRtoOffice}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.Engine}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.Year}
                  </div>
                </div>
              </div>
              <div className="info-content-mobile">
                <div className="overview-content">
                  <div className="content-key">Registration Yr.</div>
                  <div className="content-key">Fuel Type</div>
                  <div className="content-key">Kms Driven</div>
                  <div className="content-key">Ownership</div>
                  <div className="content-key">Transmission</div>
                </div>
                <div className="overview-content">
                  <div className="content-value">
                    {carData.carOverview.RegistrationYear}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.FualType}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.KmDriven}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.Ownership}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.Transmission}
                  </div>
                </div>
              </div>
              {moreOverviewToggle ? (
                <div className="info-content-mobile">
                  <div className="overview-content">
                    <div className="content-key">Insaurance</div>
                    <div className="content-key">Variant</div>
                    <div className="content-key">RTO</div>
                    <div className="content-key">Engine</div>
                    <div className="content-key">Yr. of Mfg</div>
                  </div>
                  <div className="overview-content">
                    <div className="content-value">
                      {carData.carOverview.Insaurance}
                    </div>
                    <div className="content-value">
                      {carData.carOverview.Variant}
                    </div>
                    <div className="content-value">GJ14</div>
                    <div className="content-value">
                      {carData.carOverview.Engine}
                    </div>
                    <div className="content-value">
                      {carData.carOverview.Year}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <h3
                onClick={() => {
                  setMoreOverviewToggle((value) => !value);
                }}
                className="div-header mobile pointer"
              >
                View More{" "}
                <Icon
                  className={moreOverviewToggle ? "contract" : "expand"}
                  icon="ic:round-greater-than"
                />
              </h3>
            </div>
            <div className="info-body">
              <h3 className="div-header">Features</h3>
              <div className="feature-content">
                {Object.keys(carData.carFeatures).map((keyID, index) => {
                  return index > 0 && index <= 6 ? (
                    <div className="content-key" key={crypto.randomUUID()}>
                      {carData.carFeatures[keyID] ? (
                        <Icon
                          className="tick-icon"
                          icon="charm:tick"
                          key={crypto.randomUUID()}
                        />
                      ) : (
                        <Icon
                          className="cross-icon"
                          icon="charm:cross"
                          key={crypto.randomUUID()}
                        />
                      )}{" "}
                      {keyID}
                    </div>
                  ) : (
                    <></>
                  );
                })}
                {Object.keys(carData.carFeatures).map((keyID, index) => {
                  return index > 6 && moreFeatureToggle ? (
                    <div className="content-key" key={crypto.randomUUID()}>
                      {carData.carFeatures[keyID] ? (
                        <Icon
                          className="tick-icon"
                          icon="charm:tick"
                          key={crypto.randomUUID()}
                        />
                      ) : (
                        <Icon
                          className="cross-icon"
                          icon="charm:cross"
                          key={crypto.randomUUID()}
                        />
                      )}{" "}
                      {keyID}
                    </div>
                  ) : (
                    <></>
                  );
                })}
              </div>
              <h3
                onClick={() => {
                  setMoreFeatureToggle((value) => !value);
                }}
                className="div-header pointer"
              >
                View all Features{" "}
                <Icon
                  className={moreFeatureToggle ? "contract" : "expand"}
                  icon="ic:round-greater-than"
                />
              </h3>
            </div>
            <div className="info-body">
              <h3 className="div-header">Specifications</h3>
              <div className="info-content">
                <div className="overview-content">
                  <div className="content-key">Torque</div>
                  <div className="content-key">Brake Type (rear)</div>
                  <div className="content-key">Max Power (bhp)</div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-key">Brake Type (front)</div>
                      <div className="content-key">Body Type</div>
                      <div className="content-key">Max Power (rpm)</div>
                      <div className="content-key">Emission Standard</div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="overview-content">
                  <div className="content-value">
                    {carData.carSpecifications["Torque"]}
                  </div>
                  <div className="content-value">
                    {carData.carSpecifications["Brake Type (rear)"]}
                  </div>
                  <div className="content-value">
                    {carData.carSpecifications["Max Power (bhp)"]}
                  </div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-value">
                        {carData.carSpecifications["Brake Type (front)"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Body Type"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Max Power (rpm)"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Emission Standard"]}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="overview-content">
                  <div className="content-key">Engine</div>
                  <div className="content-key">Seats</div>
                  <div className="content-key">Fuel Type</div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-key">Displacement (cc)</div>
                      <div className="content-key">Cylinders</div>
                      <div className="content-key">Fuel Tank Capacity</div>
                      <div className="content-key">Boot Space (Litres)</div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="overview-content">
                  <div className="content-value">
                    {carData.carSpecifications["Engine"]}
                  </div>
                  <div className="content-value">
                    {carData.carSpecifications["Seats"]}
                  </div>
                  <div className="content-value">
                    {carData.carOverview.FualType}
                  </div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-value">
                        {carData.carSpecifications["Displacement (cc)"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Cylinders"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Fuel Tank Capacity"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Boot Space (Litres)"]}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="info-content-mobile">
                <div className="overview-content">
                  <div className="content-key">Mileage</div>
                  <div className="content-key">Torque</div>
                  <div className="content-key">Brake(rear)</div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-key">Brake(front)</div>
                      <div className="content-key">Body Type</div>
                      <div className="content-key">Power(rpm)</div>
                      <div className="content-key">Emission Std.</div>
                      <div className="content-key">Power(bhp)</div>
                      <div className="content-key">Engine</div>
                      <div className="content-key">Seats</div>
                      <div className="content-key">Displacement(cc)</div>
                      <div className="content-key">Cylinders</div>
                      <div className="content-key">Fuel Tank CAP</div>
                      <div className="content-key">Boot Space(L)</div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="overview-content">
                  <div className="content-value">
                    {carData.carSpecifications["Mileage"]}
                  </div>
                  <div className="content-value">
                    {carData.carSpecifications["Torque"]}
                  </div>
                  <div className="content-value">
                    {carData.carSpecifications["Brake Type (rear)"]}
                  </div>
                  {moreSpecificationToggle ? (
                    <>
                      <div className="content-value">
                        {carData.carSpecifications["Brake Type (front)"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Body Type"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Max Power (rpm)"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Emission Standard"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Max Power (bhp)"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Engine"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Seats"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Displacement (cc)"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Cylinders"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Fuel Tank Capacity"]}
                      </div>
                      <div className="content-value">
                        {carData.carSpecifications["Boot Space (Litres)"]}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <h3
                onClick={() => {
                  setMoreSpecificationToggle((value) => !value);
                }}
                className="div-header pointer"
              >
                View all Specifications{" "}
                <Icon
                  className={moreSpecificationToggle ? "contract" : "expand"}
                  icon="ic:round-greater-than"
                />
              </h3>
            </div>
          </>
        )}
      </div>
      {carData ? (
        <>
          <div
            className={`mobile-buy-footer ${
              scrollDirection === "down" ? "hide-buy-footer" : "show-buy-footer"
            } transition-all`}
          >
            <div
              className={`mobile-price ${
                scrollDirection === "down"
                  ? "hide-buy-footer"
                  : "show-buy-footer"
              } transition-all`}
            >
              Rs. {carData.carOverview.Price}
            </div>
            <div
              className={`car-interactive-button-mobile ${
                scrollDirection === "down" ? "hide-buy-div" : "show-buy-div"
              } transition-all`}
            >
              <button className="darker-btn" onClick={bookmarkToggle}>
                {isBookMarked ? (
                  <Icon icon="iconamoon:bookmark-fill" />
                ) : (
                  <Icon icon="iconamoon:bookmark-bold" />
                )}
              </button>
              <button className="darker-btn">
                <p>BUY</p>
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

CarDetails.prototype = {
  carId: PropTypes.number.isRequired,
};

export default CarDetails;

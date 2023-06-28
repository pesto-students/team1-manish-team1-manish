import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { togglePage } from "../../Store/CarStore";
import { SellCarLandingPage } from "./SellCarLandingPage";
import "./LandingPage.css";

const LandingPage = () => {
  const flagPage = useSelector((state) => state.flag);
  const dispatch = useDispatch();

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
                    <select name="pets" id="pet-select">
                      <option value="">Select Budget</option>
                      <option value="dog">Dog</option>
                    </select>
                    <select name="pets" id="pet-select">
                      <option value="">Select Brand</option>
                      <option value="dog">Dog</option>
                    </select>
                    <select name="pets" id="pet-select">
                      <option value="">Select Vehicle</option>
                      <option value="dog">Dog</option>
                    </select>
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

export default LandingPage;

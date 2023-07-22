import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserDetails,
  togglePage,
  unAuthorizeUser,
} from "../../Store/CarStore";
import UseMenu from "../UserProfileMenu/UserMenu";
import "./Header.css";
import axios from "axios";
const { NODE_ENV, REACT_APP_DEV_BACKEND_BASE_URL, REACT_APP_PROD_BACKEND_BASE_URL, REACT_APP_DEV_CORS_URL, REACT_APP_PROD_CORS_URL } = process.env;

const AuthenticatedHeader = () => {
  const flagPage = useSelector((state) => state.flag);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggleHeaderClass, setToggleHeaderClass] = useState("close");

  const logoutUser = async () => {
    await axios({
      method: "get",
      url:
        NODE_ENV === "development"
          ? `${REACT_APP_DEV_BACKEND_BASE_URL}/auth/logout`
          : `${REACT_APP_PROD_BACKEND_BASE_URL}/auth/logout`,
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
          // setShowToast({ type: 1, message: 'Successfully Logged out!' })
          setTimeout(() => {
            dispatch(unAuthorizeUser());
            dispatch(setUserDetails(null));
            navigate("/");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleHeader = () => {
    if (toggleHeaderClass === "close") {
      setToggleHeaderClass("open");
    } else {
      setToggleHeaderClass("close");
    }
  };
  return (
    <>
      <div className={`header header-${toggleHeaderClass}`}>
        <div className="header-brand">
          <Link to="/">
            <div className="brand-logo-header">
              <img src="/Assets/Logo.svg" />
            </div>
            <div className="brand-name dark-font">Car Bazaar</div>
          </Link>
        </div>
        <div className="auth-header">
          <div className="header-search-bar">
            <input type="text" placeholder="Search cars" />
            <div className="search">
              <img src="./searchIcon.svg" alt="Search icon" />
            </div>
          </div>
          <div className="header-action-btn">
            <div className="user-profile-icon">
              <UseMenu />
            </div>
          </div>
        </div>
        <div className="header-links">
          <Link to="/">
            <button
              className="header-signup-btn"
              onClick={() => dispatch(togglePage())}
            >
              {flagPage ? "Buy Car" : "Sell Car"}
            </button>
          </Link>
        </div>
        <div className="hamburger-container">
          <div
            id="hamburger-icon"
            className={toggleHeaderClass}
            onClick={toggleHeader}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`hamburger-links-${toggleHeaderClass}`}>
            <p
              className="hamburger-signup-btn dark-font"
              onClick={() => {
                toggleHeader();
                dispatch(togglePage());
              }}
            >
              {flagPage ? "Sell Car" : "Buy Car"}
            </p>
            <Link to="/me">
              <p
                className="hamburger-signup-btn"
                onClick={() => {
                  toggleHeader();
                }}
              >
                Profile
              </p>
            </Link>
            <p
              className="hamburger-signup-btn dark-font"
              onClick={() => {
                toggleHeader();
                logoutUser();
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticatedHeader;

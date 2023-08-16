import React, { useEffect, useState } from "react";
import UserActivity from "../UserActivity/UserActivity";
import UserActivityCard from "../UserActivityCard/UserActivityCard";
import { unAuthorizeUser } from "../../Store/CarStore";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetailView.css";
import { CircularProgress } from "@mui/material";
const {
  NODE_ENV,
  REACT_APP_DEV_BACKEND_BASE_URL,
  REACT_APP_PROD_BACKEND_BASE_URL,
  REACT_APP_DEV_CORS_URL,
  REACT_APP_PROD_CORS_URL,
} = process.env;

function UserDetailView() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [showToast, setShowToast] = useState({ type: 0, message: "" });
  const userDetails = useSelector((state) => state.userData.details);

  const activityData = Object.freeze([
    {
      name: "My Orders",
      icon: "box",
    },
    {
      name: "Shortlisted Vehicles",
      icon: "bookmark",
    },
    {
      name: "My Vehicles",
      icon: "car",
    },
    {
      name: "Profile Settings",
      icon: "gear",
    },
  ]);

  const [activeTab, setActiveTab] = useState(null);
  const userDetail = useSelector((state) => {
    return state.userData.details;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    setIsLoading(true);
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
          setTimeout(() => {
            navigate("/");
            dispatch(unAuthorizeUser());
            setIsLoading(false);
          }, 3000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setShowToast({
          type: 2,
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong !",
        });
      });
  };

  const getOrder = async () => {
    if (userDetails.id !== "") {
      const url =
        (NODE_ENV === "development"
          ? REACT_APP_DEV_BACKEND_BASE_URL
          : REACT_APP_PROD_BACKEND_BASE_URL) + `/auth/users/${userDetails.id}/orders`;

      await axios({
        method: "get",
        url: url,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status == 200) {
            setOrder(res.data);
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
    }
  };

  const getBookmark = async () => {
    if (userDetails.id !== "") {
      const url =
        (NODE_ENV === "development"
          ? REACT_APP_DEV_BACKEND_BASE_URL
          : REACT_APP_PROD_BACKEND_BASE_URL) + `/auth/users/${userDetails.id}/bookmarks`;

      await axios({
        method: "get",
        url: url,
        withCredentials: true,
      })
        .then((res) => {
          if (res.status == 200) {
            setBookmark(res.data);
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
    }
  };

  useEffect(() => {
    getOrder();
    return () => { };
  }, [userDetails]);

  useEffect(() => {
    getBookmark();
    return () => { };
  }, [userDetail]);

  return (
    <div className="user-detail-view__wrapper">
      {isLoading ? (
        <div className="circular-loader">
          <CircularProgress />
        </div>
      ) : (
        <></>
      )}
      <div className="user-detail-view__container">
        <div className="user-detail-view__user-details">
          <span className="user-detail-view__user-avatar">
            {userDetail.first_name[0]?.toUpperCase()}
            {userDetail.last_name[0]?.toUpperCase()}
          </span>
          <h3 className="user-detail-view__user-name">
            {userDetail.name}
          </h3>
          <p className="user-detail-view__user-mobile">
            <a href={`tel:+91${userDetail.phone_no}`}>
              {userDetail.phone_no}
            </a>
          </p>
          <p className="user-detail-view__user-mail">
            <a href={`mailto:${userDetail.email}`}>
              {userDetail.email}
            </a>
          </p>
        </div>
        <div className="user-detail-view__user-activity-container">
          {activityData.map((activity, idx) => {
            let data;
            if (
              activity.name.toLowerCase() === "my orders" ||
              activity.name.toLowerCase() === "my vehicles"
            ) {
              data = order;
            } else if (activity.name.toLowerCase() === "shortlisted vehicles") {
              data = bookmark;
            }
            return (
              <>
                <UserActivity
                  name={activity.name}
                  icon={activity.icon}
                  key={crypto.randomUUID()}
                  index={idx}
                  isActive={activeTab === idx}
                  setIsActive={setActiveTab}
                  data={data}
                />
              </>
            );
          })}
        </div>
        <button className="user-detail-view__logout-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
      <div className="user-detail-view__activity-card">
        {activityData.map((activity, idx) => {
          let data;
          if (activity.name.toLowerCase() === "my orders") {
            data = order.filter((el) => {
              return el.order_status === "Bought";
            });
          } else if (activity.name.toLowerCase() === "shortlisted vehicles") {
            data = bookmark;
          } else if (activity.name.toLowerCase() === "my vehicles") {
            data = order.filter((el) => {
              return el.order_status === "Listed";
            });
          }
          return (
            <UserActivityCard
              name={activity.name}
              icon={activity.icon}
              key={crypto.randomUUID()}
              data={data}
              isActive={activeTab === idx}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserDetailView;

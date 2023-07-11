import React, { useState } from "react";
import UserActivity from "../UserActivity/UserActivity";
import UserActivityCard from "../UserActivityCard/UserActivityCard";
import activityData from "../../Pages/Profile/UserActivityData.json";
import { setUserDetails, unAuthorizeUser } from "../../Store/CarStore";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetailView.css";

function UserDetailView() {
  const [activeTab, setActiveTab] = useState(null);
  const userDetail = useSelector((state) => {
    return state.userDetails;
  });
  const dummyUserDetail = {
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    name: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    await axios({
      method: "get",
      url: process.env.REACT_APP_LOGOUT_URL,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CORS_URL,
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

  return (
    <div className="user-detail-view__wrapper">
      <div className="user-detail-view__container">
        <div className="user-detail-view__user-details">
          <span className="user-detail-view__user-avatar">
            {userDetail ? userDetail.first_name[0] : dummyUserDetail.first_name}
            {userDetail ? userDetail.last_name[0] : dummyUserDetail.last_name}
          </span>
          <h3 className="user-detail-view__user-name">
            {userDetail ? userDetail.name : dummyUserDetail.name}
          </h3>
          <p className="user-detail-view__user-mobile">
            <a href="tel:+919027310299">
              {userDetail ? userDetail.phone_no : dummyUserDetail.phone_no}
            </a>
          </p>
          <p className="user-detail-view__user-mail">
            <a href="mailto:cjatin2822@gmail.com">
              {userDetail ? userDetail.email : dummyUserDetail.email}
            </a>
          </p>
        </div>
        <div className="user-detail-view__user-activity-container">
          {activityData.map((activity, idx) => {
            return (
              <>
                <UserActivity
                  name={activity.name}
                  icon={activity.icon}
                  key={idx}
                  index={idx}
                  isActive={activeTab === idx}
                  setIsActive={setActiveTab}
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
          return (
            <UserActivityCard
              name={activity.name}
              icon={activity.icon}
              key={idx}
              isActive={activeTab === idx}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserDetailView;

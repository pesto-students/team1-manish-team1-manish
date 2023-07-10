import React, { useState } from "react";
import "./UserDetailView.css";
import UserActivity from "../UserActivity/UserActivity";
import UserActivityCard from "../UserActivityCard/UserActivityCard";
import activityData from "../../Pages/Profile/UserActivityData.json";

function UserDetailView() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="user-detail-view__wrapper">
      <div className="user-detail-view__container">
        <div className="user-detail-view__user-details">
          <span className="user-detail-view__user-avatar">J</span>
          <h3 className="user-detail-view__user-name">Jatin Chhabra</h3>
          <p className="user-detail-view__user-mobile">
            <a href="tel:+919027310299">9027310299</a>
          </p>
          <p className="user-detail-view__user-mail">
            <a href="mailto:cjatin2822@gmail.com">cjatin2822@gmail.com</a>
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
        <button className="user-detail-view__logout-btn">Logout</button>
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

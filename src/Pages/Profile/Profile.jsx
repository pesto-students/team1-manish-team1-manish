import React, { useEffect } from "react";
import UserDetailView from "../../components/UserDetailView/UserDetailView";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
  const userDetails = useSelector(state => state.userDetails);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userDetails.id) {
      navigate('/');
    }
  }, [userDetails]);
  return (
    <div className="profile">
      <UserDetailView />
    </div>
  );
}

export default Profile;

import React, { useEffect, useState } from 'react';
import UserActivity from '../UserActivity/UserActivity';
import UserActivityCard from '../UserActivityCard/UserActivityCard';
import { setUserDetails, unAuthorizeUser } from '../../Store/CarStore';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetailView.css';

function UserDetailView() {
  const [order, setOrder] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const baseUrlProd = 'https://car-bazar-backend-pesto-team.vercel.app';
  const baseUrlDev = 'http://localhost:3000';

  const userId = useSelector((state) => state.userDetails?.id);

  const activityData = Object.freeze([
    {
      name: 'My Orders',
      icon: 'box',
    },
    {
      name: 'Shortlisted Vehicles',
      icon: 'bookmark',
    },
    {
      name: 'My Vehicles',
      icon: 'car',
    },
    {
      name: 'Profile Settings',
      icon: 'gear',
    },
  ]);

  const [activeTab, setActiveTab] = useState(null);
  const userDetail = useSelector((state) => {
    return state.userDetails;
  });
  const dummyUserDetail = {
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    name: '',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = async () => {
    await axios({
      method: 'get',
      url:
        process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_DEV_LOGOUT_URL
          : process.env.REACT_APP_PROD_LOGOUT_URL,
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin':
          process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_DEV_CORS_URL
            : process.env.REACT_APP_PROD_CORS_URL,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          // setShowToast({ type: 1, message: 'Successfully Logged out!' })
          setTimeout(() => {
            dispatch(unAuthorizeUser());
            dispatch(setUserDetails(null));
            navigate('/');
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateOrder = () => {
    if (userId)
      fetch(
        (process.env.NODE_ENV === 'development' ? baseUrlDev : baseUrlProd) +
          `/auth/users/${userId}/orders`,
        { credentials: 'include' }
      )
        .then((res) => {
          if (res.status !== 200) throw Error('Error response');
          return res.json();
        })
        .then((data) => setOrder(data))
        .catch((error) => {
          console.log(error);
        });
  };

  const updateBookmark = () => {
    userDetail?.bookmark_ids?.map((carId) => {
      fetch(
        (process.env.NODE_ENV === 'development' ? baseUrlDev : baseUrlProd) +
          `/cars/ids/${carId}`,
        { credentials: 'include' }
      )
        .then((response) => response.json())
        .then((d) => {
          if (!!bookmark?.filter((car) => car.id === d.id)) {
            setBookmark((prev) => [...prev, d]);
          }
        });
    });
  };

  useEffect(() => updateOrder(), [userId]);

  useEffect(() => updateBookmark(), [userDetail]);

  return (
    <div className='user-detail-view__wrapper'>
      <div className='user-detail-view__container'>
        <div className='user-detail-view__user-details'>
          <span className='user-detail-view__user-avatar'>
            {userDetail ? userDetail.first_name[0] : dummyUserDetail.first_name}
            {userDetail ? userDetail.last_name[0] : dummyUserDetail.last_name}
          </span>
          <h3 className='user-detail-view__user-name'>
            {userDetail ? userDetail.name : dummyUserDetail.name}
          </h3>
          <p className='user-detail-view__user-mobile'>
            <a href='tel:+919027310299'>
              {userDetail ? userDetail.phone_no : dummyUserDetail.phone_no}
            </a>
          </p>
          <p className='user-detail-view__user-mail'>
            <a href='mailto:cjatin2822@gmail.com'>
              {userDetail ? userDetail.email : dummyUserDetail.email}
            </a>
          </p>
        </div>
        <div className='user-detail-view__user-activity-container'>
          {activityData.map((activity, idx) => {
            let data;
            if (activity.name.toLowerCase() === 'my orders') {
              data = order;
            } else if (activity.name.toLowerCase() === 'shortlisted vehicles') {
              data = bookmark;
            }
            return (
              <>
                <UserActivity
                  name={activity.name}
                  icon={activity.icon}
                  key={idx}
                  index={idx}
                  isActive={activeTab === idx}
                  setIsActive={setActiveTab}
                  data={data}
                />
              </>
            );
          })}
        </div>
        <button className='user-detail-view__logout-btn' onClick={logoutUser}>
          Logout
        </button>
      </div>
      <div className='user-detail-view__activity-card'>
        {activityData.map((activity, idx) => {
          let data;
          if (activity.name.toLowerCase() === 'my orders') {
            data = order;
          } else if (activity.name.toLowerCase() === 'shortlisted vehicles') {
            data = bookmark;
          }
          return (
            <UserActivityCard
              name={activity.name}
              icon={activity.icon}
              key={idx}
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

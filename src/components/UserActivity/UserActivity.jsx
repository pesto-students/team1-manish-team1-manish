import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import GarageIcon from '@mui/icons-material/Garage';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import UserActivityCard from '../UserActivityCard/UserActivityCard';
import './UserActivity.css';

function UserActivity(props) {
  const { name, icon, isActive, setIsActive, index, data } = props;

  const activityIcon = (icon) => {
    if (icon === 'box') {
      return <InventoryIcon />;
    } else if (icon === 'gear') {
      return <SettingsIcon />;
    } else if (icon === 'car') {
      return <GarageIcon />;
    } else if (icon === 'bookmark') {
      return <BookmarkIcon />;
    }
  };

  return (
    <div className='user-activity__container'>
      <div
        className={`user-activity__activity-wrapper ${
          isActive ? 'active' : ''
        }`}
        onClick={() => {
          setIsActive((prev) => {
            if (prev === index) {
              return null;
            } else return index;
          });
        }}
      >
        <div className='user-activity__activity-details'>
          {activityIcon(icon)}
          <p>{name}</p>
        </div>
        <KeyboardArrowRightIcon
          className={isActive ? `user-activity__activity-arrow` : ''}
        />
      </div>
      <div className='user-activity__card'>
        <UserActivityCard
          name={name}
          icon={icon}
          isActive={isActive}
          data={data}
        />
      </div>
    </div>
  );
}

export default UserActivity;

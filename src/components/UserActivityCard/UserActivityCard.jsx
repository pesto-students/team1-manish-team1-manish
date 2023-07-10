import React from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import GarageIcon from '@mui/icons-material/Garage';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './UserActivityCard.css';

function UserActivityCard(props) {
  const { name, icon, isActive } = props;

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
  return isActive ? (
    <div className='user-activity-card__container'>
      <h3 className='user-activity-card__title'>
        <span className='user-activity-card__icon'>{activityIcon(icon)}</span>{' '}
        {name}
      </h3>
      <div className='user-activity-card__content'>
        <p>Content coming soon...</p>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default UserActivityCard;

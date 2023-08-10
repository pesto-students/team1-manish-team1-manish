import React, { useEffect, useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import GarageIcon from "@mui/icons-material/Garage";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import OrderDetail from "../OrderDetail/OrderDetail";
import "./UserActivityCard.css";

function UserActivityCard(props) {
  const { name, icon, isActive, data } = props;

  const activityIcon = (icon) => {
    if (icon === "box") {
      return <InventoryIcon />;
    } else if (icon === "gear") {
      return <SettingsIcon />;
    } else if (icon === "car") {
      return <GarageIcon />;
    } else if (icon === "bookmark") {
      return <BookmarkIcon />;
    }
  };

  const activtySelected = data?.map((car, idx) => {
    return (
      <OrderDetail
        model={car.model}
        brand={car.brand}
        year={car.year}
        orderStatus={car.order_status}
        key={idx}
      />
    );
  });

  return isActive ? (
    <div className="user-activity-card__container">
      <h3 className="user-activity-card__title">
        <span className="user-activity-card__icon">{activityIcon(icon)}</span>{" "}
        {name}
      </h3>
      <div className="user-activity-card__content">{activtySelected}</div>
    </div>
  ) : (
    <></>
  );
}

export default UserActivityCard;

import { Alert, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileSettings.css"
import { updateUserDetails } from "../../Store/CarStore";

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userData.details);
    const [firstName, setFirstName] = useState(userDetails.first_name);
    const [lastName, setLastName] = useState(userDetails.last_name);
    const [phoneNo, setPhoneNo] = useState(userDetails.phone_no ?? '');
    const [email, setEmail] = useState(userDetails.email);
    const [showToast, setShowToast] = useState({ type: 0, message: "" });
    const resetToast = () => {
        setShowToast({ type: 0, message: "" });
    };

    const updateUserInfo = () => {
        if (!firstName.length || !lastName.length || phoneNo.length !== 10) {
            return;
        }
        if (userDetails.first_name !== firstName || userDetails.last_name !== lastName || userDetails.phone_no !== phoneNo) {
            dispatch(updateUserDetails({ firstName, lastName, phoneNo }));
        }
    }

    return (
        <>
            <Snackbar
                className="toastify-class"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={showToast.type == 2}
                autoHideDuration={5000}
                onClose={resetToast}
            >
                <Alert onClose={resetToast} severity="error" sx={{ width: "100%" }}>
                    {showToast.message}
                </Alert>
            </Snackbar>
            <Snackbar
                className="toastify-class"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={showToast.type == 1}
                autoHideDuration={2500}
                onClose={resetToast}
            >
                <Alert onClose={resetToast} severity="success" sx={{ width: "100%" }}>
                    {showToast.message}
                </Alert>
            </Snackbar>
            <TextField
                label='First Name'
                className="profile-settings-input"
                error={!firstName.length}
                value={firstName}
                size="small"
                onChange={(e) => {
                    setFirstName(e.target.value);
                }}
            />
            <TextField
                label='Last Name'
                className="profile-settings-input"
                error={!lastName.length}
                value={lastName}
                size="small"
                onChange={(e) => {
                    setLastName(e.target.value);
                }}
            />
            <TextField
                label='Phone Number'
                className="profile-settings-input"
                value={`+91${phoneNo}`}
                error={phoneNo.length !== 10}
                size="small"
                onChange={(e) => {
                    setPhoneNo(e.target.value.slice(3,));
                }}
            />
            <TextField
                label='Email Address'
                className="profile-settings-input"
                value={email}
                size="small"
                disabled
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <button
                className="darker-btn profile-save-btn"
                disabled={(userDetails.first_name === firstName && userDetails.last_name === lastName && userDetails.phone_no === phoneNo) || (!firstName.length || !lastName.length || phoneNo.length !== 10)}
                onClick={updateUserInfo}
            >
                Save
            </button>
        </>
    );
}

export default ProfileSettings;

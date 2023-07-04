import React, { useState } from 'react';
import './CarShow.css';

export default function CarShow() {
    const [toggle, setToggle] = useState(false);
    console.log(toggle);
    return <div className="main-car-show">

        <div className={toggle?"hide-side-bar":"side-bar"}>
            <div className="car-brand"></div>
            <div className="car-budget"></div>
            <div className="car-type"></div>
            <div className="car-brand"></div>
            <div className="car-budget"></div>
            <div className="car-type"></div>
        </div>
        <div className={toggle?"full-car-page":"car-show"}>
            <button onClick={() => setToggle(prevState => !prevState)}>Toggle Side Bar</button>
        </div>
    </div>
}
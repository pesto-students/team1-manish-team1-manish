import React, { useState } from "react";
import "./styles.css";
require("dotenv").config();

const { KEY_ID, SERVER_URL } = process.env;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function paymentButton() {
  const [name, setName] = useState("Pranav");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Try again.");
      return;
    }

    const data = await fetch(`${SERVER_URL}/checkout`, { method: "POST" }).then(
      (res) => res.json()
    );

    console.log(data);
    const options = {
      key: KEY_ID,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Car",
      description: "Thank you for shopping!",
      // image: '',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name,
        email: "pranav@carbazaar.com",
        phone_number: "9999999999",
      },
      theme: {
        color: "#FF9F37",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <div className="payment__page">
      <button className="payment__button--pay" onClick={displayRazorpay}>
        Pay
      </button>
      </div>
    </>
  );
}

export default paymentButton;

import React from 'react';
import './OrderDetail.css';

function OrderDetail(props) {
  const { model, brand, orderStatus, year } = props;

  console.log(props);

  return (
    <div className='order-details'>
      <div className='order-details__car'>
        <h4>{brand}</h4>
        <p>{model}</p>
        <p>{year}</p>
      </div>
      {orderStatus ? (
        <p className='order-details__order-status'>{orderStatus}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderDetail;

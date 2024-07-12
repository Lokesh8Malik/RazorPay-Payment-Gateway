import React from 'react'
import { useParams } from 'react-router-dom'
const PaymentSuccess = () => {
    const {reference} = useParams();
  return (
    <div>
        <h1>Order Successfull</h1>
        <div>Reference Number : {reference}</div>
    </div>
  )
}

export default PaymentSuccess
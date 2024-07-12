import React from 'react'
import classes from './HomePage.module.css';
import CourseCard from './CourseCard';
import axios from 'axios';
const HomePage = () => {
    const checkOutHandler = async (amount)=>{
        const {data1} = await axios.get("http://localhost:4444/api/getKey");
        const {data} = await axios.post("http://localhost:4444/api/checkout",{
            amount
        })
        const {order} = data;
        const {key} = data1;
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Lokesh Malik",
            description: "Tutorial of RazorPay",
            image: "https://yt3.ggpht.com/ytc/AIdro_l7I9Z2ruLwb_8O5wqZX3BeggKDhG9XW1jritguKKq0ERDMHNocJbKZGdEYuVaEVLicvQ=s88-c-k-c0x00ffffff-no-rj",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: "Lokesh Malik",
                email: "lokesh8malik@gmail.com",
                contact: "9999976448"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    
    }

    
  return (
    <div className={classes['container']}>
        <CourseCard amount = {5000} img = "https://www.onlinecoursereport.com/wp-content/uploads/2020/07/shutterstock_394793860-1536x1177.jpg" checkOutHandler = {checkOutHandler}></CourseCard>
        <CourseCard amount = {3500} img = "https://th.bing.com/th/id/OIP.2G4dgQ6VWmrJUyrS9gfx_QAAAA?rs=1&pid=ImgDetMain" checkOutHandler = {checkOutHandler}></CourseCard>
    </div>
  )
}

export default HomePage
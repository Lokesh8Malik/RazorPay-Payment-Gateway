import React from 'react'
import classes from './CourseCard.module.css';
const CourseCard = ({amount,img,checkOutHandler}) => {
  return (
    <div>
        <img src={img} className={classes['image']} alt='courses'></img>
        <div>₹{amount}</div>
        <button onClick={()=>checkOutHandler(amount)}>Buy Now</button>
    </div>
  )
}

export default CourseCard
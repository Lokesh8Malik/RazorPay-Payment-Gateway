import Razorpay from "razorpay";
import { config } from "dotenv";
import ErrorHandler from "../utils/ErrorHandler.js";
import crypto from 'crypto';
import paymentModel from "../models/paymentModel.js";
config({path : "./config.env"});


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_APIKEY,
    key_secret: process.env.RAZORPAY_SECRETKEY
});

const getKey = async(req,res,next)=>{
    try{
        res.status(200).json({
            key : process.env.RAZORPAY_APIKEY
        })
    }
    catch(err){
        throw new ErrorHandler(500,"Unable to give you the key")
    }
}

const postCheckOut = async(req,res,next)=>{
    const {amount} = req.body;
    const options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
        // receipt: "order_rcptid_11"
    };
    try{
        const order = await instance.orders.create(options);

        res.status(200).json({
            success : true,
            order
        })
    }
    catch(error){
        throw new ErrorHandler(500,"Unable to checkout or cretae the instance of the order.")
    }
}

const paymentverification = async(req,res,next)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try{
        const result = await paymentVerify(razorpay_order_id,razorpay_payment_id,razorpay_signature);
        if(!result){
            throw new ErrorHandler(400,"Incorrect order and payment id");
        }
        await paymentModel.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        res.redirect(`http://localhost:3000/paymentsuccess/:reference=${razorpay_payment_id}`);
    }
    catch(err){
        throw new ErrorHandler(400,"Unable to create your payment order and verification ids.");
    }
}

export {getKey,postCheckOut,paymentverification};
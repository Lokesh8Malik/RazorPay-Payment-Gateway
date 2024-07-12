import express from 'express';
import mongoose  from 'mongoose';
import { config } from 'dotenv';
import ErrorHandler from './src/utils/ErrorHandler.js';
import cors from 'cors';
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend server
    // optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };

//middlewares
app.use(cors(corsOptions));
app.use(express.json({limit : "1mb"}));
app.use(express.urlencoded({extended : true,limit : "1mb"}))

// .env files access
config({path : "./config.env"});

// Router setup and importing
import payRouter from './src/routes/paymentRouter.js';

//router middleware

app.use("/api",payRouter);

async function main(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/razorPay");
        app.listen(process.env.PORT, ()=>{
            console.log(`http://localhost:${process.env.PORT}`);
        })
    }
    catch(err){
        throw new ErrorHandler(500,"Unable to connect the server")
    }
}
main();

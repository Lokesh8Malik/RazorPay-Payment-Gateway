import mongoose,{Schema} from "mongoose";
import ErrorHandler from "../utils/ErrorHandler.js";

const paymentSchema = new Schema({
    orderID : {
        type : String,
        required: true
    },
    paymentID : {
        type : String,
        required : true
    },
    signature : {
        type : String,
        required : true
    }
})

paymentSchema.methods.paymentVerify = async function(razorpay_order_id,razorpay_payment_id,razorpay_signature){
    try{
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRETKEY).update(body.toString()).digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;
        return isAuthentic;
    }
    catch(err){
        throw new ErrorHandler(500,"Unable to verify payment.")
    }
}

export default mongoose.model("paymentModel",paymentSchema);
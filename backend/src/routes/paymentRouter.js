import express from 'express';
import { postCheckOut,getKey, paymentverification } from '../controller/paymentController.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';
const router = express.Router();

router.get('/getKey',ErrorWrapper(getKey));
router.post('/checkout',ErrorWrapper(postCheckOut));
router.post('/paymentverification',ErrorWrapper(paymentverification))

export default router;
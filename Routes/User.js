import express from 'express'

import { userRegistation } from '../middleware/Auth/registerUser.js'
import { login } from '../middleware/Auth/login.js';



const router = express.Router();

router.post("/signup" ,userRegistation);
router.post("/login" ,login)





export default router;                      
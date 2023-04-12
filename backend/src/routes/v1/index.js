import  express from "express";

import { createUser ,login } from "../../controllers/auth-controller.js";
import { authenticate } from "../../middlewares/authenticate.js";
const router=express.Router();



//router.post('/comment',authenticate,createComment)

router.post('/signup',createUser)

router.post('/login', login);
export default router;

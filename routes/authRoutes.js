import { Router } from "express";
import { check } from "express-validator";

import { login } from "../controllers/authController.js";
import { checkForm } from "../middleware/checkForm.js";
import validateJWT from "../middleware/validateJWT.js";


const authRouter = Router();

authRouter.post('/login',[
    check('email','email is required').isEmail(),
    check('password','password is required').not().isEmpty(),
    checkForm
],login)

export default authRouter;
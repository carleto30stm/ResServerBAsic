import { response } from "express";
import { validationResult } from "express-validator";

const checkForm = (req, res = response, next)=>{
    const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json(errors);
    }
    next();
}
export {
    checkForm
}
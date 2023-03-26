import { request, response } from "express";
import { jwtGenerator } from "../helpers/jwtGenerator.js";

import Users from "../models/userModel.js";

const login = async (req = request , res = response) => {
    const {email, password, _id} = req.body;

    const user = await Users.findOne({email});
    
    if (!user) {
        return res.status(403).json({mgs:'User is not registered or invalid'});
    }
    if (!user.active) {
        return res.status(403).json({mgs:'User status false'});
    }
    
    
    
    try {
        if (await user.comparePass(password)) {
            const token = await jwtGenerator(_id)
            res.json({email, token})          
        }else{
            return res.status(403).json({mgs:'Password invalid'});
            
        }
   } catch (error) {
    console.log(error);
   }

}


export {
    login
}
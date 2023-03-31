import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

  
const validateJWT = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const {uid} = jwt.verify(token, process.env.SECRET_JWT);
       const userAuth = await Users.findOne({_id:uid});
       if (!userAuth) {
        return res.status(401).json({
          msg:'User not fount'
        })
       }
       if (!userAuth.active) {
        return res.status(401).json({
          msg:'User active: false'
        })
       }
       req.userAuth = userAuth;
     
      return next();
    } catch (e) {
      console.log(e);
    }
  }
  if (!token) {
    const error = new Error("Invalid token");
      res.status(403).json({ msg: error.message });
  }
  next();
};

export default validateJWT;
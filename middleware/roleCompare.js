import { json } from "express";

const adminRole = (req, res, next) => {
  try {
    const user = req.userAuth;
    if (!user) {
      return (
        res.status(500),
        json({
          msg: "token is required",
        })
      );
    }
    const { role } = user;
    if (role !== "ADMIN_ROLE") {
      return res.status(401).json({
        msg: "Admin role required",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
const haveRole = (...roles) => {
  return (req, res, next) => {
    const user = req.userAuth;
    if (!user) {
      return (
        res.status(500),
        json({
          msg: "token is required",
        })
      );
    }
    if (!roles.includes(user.role)) {
      return res.status(401).json({
        msg:`no esta permitido por rol`
      })
     
    }
  
    next();
  }
}

export { adminRole, haveRole };

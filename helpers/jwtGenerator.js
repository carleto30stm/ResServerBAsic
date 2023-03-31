import jwt from "jsonwebtoken";

const jwtGenerator = (uid)=>{
    return jwt.sign({uid},process.env.SECRET_JWT,{
        expiresIn:'1h'
    })
}
export default jwtGenerator;
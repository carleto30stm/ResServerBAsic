import jwt from "jsonwebtoken";

const jwtGenerator = (uid = '')=>{
    return new Promise( (res, rej) =>{
        jwt.sign({uid}, process.env.SECRET_JWT,{
            expiresIn: '1h'
        },(err, token)=>{
            if (err) {
                console.log(err);
                rej('failed to generate token')
            } else {
                res(token)
            }
        })
    })
}
export{
    jwtGenerator
}
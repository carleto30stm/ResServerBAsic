import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"


const UserSchema = new Schema({
userName: {
    type: String,
    require: true,
},email:{
    type: String,
    require: true,
    unique: true
},
password:{
    type: String,
    require: true
},
img: {
    type: String
},
role: {
    type: String,
    require: true,
    enum: []
},
active: {
 type: Boolean,
    default: true
},
google:{
    type: Boolean,
    default: false
}
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject();
    return user
}
UserSchema.methods.comparePass = async function (passForm) {
    return await bcrypt.compare(passForm,this.password)
}

 export default model('Users', UserSchema);



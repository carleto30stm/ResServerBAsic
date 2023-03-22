import { Schema,model } from "mongoose";

const RoleSchema = new Schema({
    role: {
        type: String,
        require:[true,'Role is required']
    }
})

export default model('Role', RoleSchema)
import Role from "../models/roleModel.js";
import Users from "../models/userModel.js";





const validateRole = async(role = '')=>{
        const roleMatch = await Role.findOne({role});
        if (!roleMatch) {
            throw new Error(`${role} does not match database`)
        }
    }

const validateEmail = async (email = '')=>{
    const emailMatch = await Users.findOne({email})
    if (emailMatch) {
        throw new Error('Email is already registered');
    }
}
const validateUserId = async (_id = '')=>{
    const idMatch = await Users.findById({_id});
    if (!idMatch) {
        throw new Error(`User id ${_id} no fount`);
    }
}
export {
    validateRole,
    validateEmail,
    validateUserId
}
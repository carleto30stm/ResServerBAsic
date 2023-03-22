import { response } from "express";

import Users from "../models/userModel.js";

const register = async (req, res = response) => {
  const { userName, email, password, role } = req.body;

  try {
    const user = new Users({ userName, email, password, role });
    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req = Request, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  const user = await Users.findById({ _id }).select("-password -google");

  try {
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async (req = Request, res = Response) => {
  try {
    const { from = 0, limit = 5 } = req.query;
    const query = {active: true};

    // const users = await Users.find(query).skip(Number(from)).limit(Number(limit));
    // const allUsers = await Users.countDocuments(query);

    //Esto hace lo mismo pero ejecuta los dos variables al mismo tiempo usando await
    const [allUsers, users] = await Promise.all([
        Users.countDocuments(query),
        Users.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({ allUsers, users });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req = Request , res = Response)=>{
    const {_id} = req.params;
    try {
        const user = await Users.findByIdAndUpdate(_id,{active:false});
        res.json(user)
    } catch (error) {
        console.log(error);
    } 
}

export { 
    register,
    update, 
    getUsers,
    deleteUser
 };

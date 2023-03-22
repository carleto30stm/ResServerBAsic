import mongoose from "mongoose";

const dbConection = async ()=>{
 try {
    mongoose.connect(process.env.MONGODB);
    console.log('DB online');
 } catch (error) {
    console.log(error);
    throw new Error('la base de datos no pudo conectar')
 }
}

export default dbConection;
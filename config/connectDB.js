// import mongoose from "mongoose"


// export  const  connectDb = async(()=>{

//     try {
//       await = mongoose.connect(process.env.Mongo_URL);
//         console.log("mongoDb connected  successfully")
        
//     } catch (error) {
//         console.log("mongodb not connected",error)
//         process.exit(1)
//     }

// })


import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB not connected❌", error);
    process.exit(1);
  }
};
     
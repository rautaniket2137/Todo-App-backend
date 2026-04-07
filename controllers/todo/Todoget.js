
// import TaskModel from '../../module/Task.js';

// export const getTodo = async (req,res)=>{

//     try{
//         const { userId}= req.user.userId
//         const todo = await TaskModel.findOne({userId})

//         res.status(200).json({Message:"Todos retrieved successfully", todo})

//     }catch(error){
//         res.status(4000).json({Message:"Server error occurred"})
//     }

// }

import TaskModel from "../../module/Task.js";

export const getTodo = async (req, res) => {
  try {
    const userId = req.user.id;   // ✅ FIXED

    const todos = await TaskModel.find({ userId });  // 🔐 filter by user

    res.status(200).json({
      message: "Todos fetched successfully",
      todos,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error occurred" });
  }
};
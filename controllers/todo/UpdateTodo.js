// import TaskModel from "../../module/Task.js";

// export const updateTodo  = async (req,res)=>{

//     try{
//         const {userId} = req.user.userId
//         const {id } = req.params
//         const {title, status} = req.body

//          const validStages = ['incomplete', 'doing', 'completed'];
//         if (status && !validStages.includes(status)) {
//             return res.status(400).json({ message: "Invalid status value" }); // Handling invalid stage value
//         }

//         const updateTodo = await TaskModel.findOneAndUpdate({_id :id,userId}, {title, status}, {new:true})
//         if(!updateTodo){
//             return res.status(404).json({message:"Todo not found"})
//         }
//         res.status(200).json({message:"Todo updated successfully", todo: updateTodo})
//     }catch(error){
//         res.status(400).json({message:"Server error occurred"})
// }}



import mongoose from "mongoose";
import TaskModel from "../../module/Task.js";

export const updateTodo = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const { id } = req.params;
    const { text, status } = req.body;

    // ✅ validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const validStages = ["incomplete", "doing", "completed"];
    if (status && !validStages.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    if (!text && !status) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updateFields = {};
    
    if (text) updateFields.text = text;
    if (status) updateFields.status = status;

    const updatedTodo = await TaskModel.findOneAndUpdate(
      { _id: id, userId },
      updateFields,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });

  } catch (error) {
    console.log("❌ UPDATE ERROR:", error); // 🔥 KEY
    res.status(500).json({ message: "Server error occurred" });
  }
};
import TaskModel from "../../module/Task.js";

export  const  deleteTodo = async  (req,res)=>{
    try{
        const userId = req.user.userId
        const {id}= req.params

        const deleteTodo = await TaskModel.findOneAndDelete(id, userId  )


        if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

        res.status(200).json({message:"Deleted successfully deleteTodo",Todo:deleteTodo})

    }catch(error){
        res.status(400).json({message:"Server error occurred"})
    }
}
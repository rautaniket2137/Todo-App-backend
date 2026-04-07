
// import mongoose from "mongoose";
//  const taskschema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//       userId: {
//        type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Reference to the User schema
//         required: true
//     },
//     status: {

//         type: String,
//         enum: ["incomplete","doing","complete"],
//         default: "incomplete"
//     },
  
// }, {timestamps:true});
// const TaskModel = mongoose.model("Task", taskschema);
// export default TaskModel;

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["incomplete", "doing", "completed"], // ✅ consistent
      default: "incomplete",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
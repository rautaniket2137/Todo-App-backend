


// import TaskModel from "../../module/Task.js";

// export const createTodo = async (req, res) => {
//   try {
//     const { title } = req.body;

//     // ✅ get userId from token middleware
//     const userId = req.user.id;

//     // ✅ validation
//     if (!title) {
//       return res.status(400).json({ message: "Title is required" });
//     }

//     // ✅ create todo
//     const newTodo = new TaskModel({
//       title,
//       userId,
      
//     });

//     console.log(newTodo);

//     const savedTodo = await newTodo.save();

//     return res.status(201).json({
//       message: "Todo created successfully",
//       todo: savedTodo,
//     });

//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



import TaskModel from "../../module/Task.js";

export const createTodo = async (req, res) => {
  try {
    const { text, dueDate } = req.body;

    const userId = req.user.id;

    // ✅ validation
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    // ✅ create todo
    const newTodo = await TaskModel.create({
      text: text.trim(),
      userId,
      dueDate: dueDate || null,
      status: "incomplete", // ✅ ensure default
    });

    return res.status(201).json(newTodo); // ✅ IMPORTANT FIX

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
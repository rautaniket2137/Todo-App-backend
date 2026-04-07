import express from "express"
import { verifyToken } from "../middleware/jwt/authMiddleware.js";
import { getTodo } from "../controllers/todo/Todoget.js";
import { createTodo } from "../controllers/todo/Create_Todo.js";
import { updateTodo } from "../controllers/todo/UpdateTodo.js";
import { deleteTodo } from "../controllers/todo/DeleteTodo.js";


const  router = express.Router();

router.post("/",verifyToken,createTodo)
router.get("/",verifyToken,getTodo)
router.put("/:id",verifyToken,updateTodo)
router.delete("/:id",verifyToken,deleteTodo)

;

export default router;
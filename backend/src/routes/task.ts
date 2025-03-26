import { Router } from "express";
import {
	createTask,
	deleteTask,
	getAllTasks,
	updateTask,
} from "../controllers/task";

const taskRouter = Router();

taskRouter.get("/:listId/tasks", getAllTasks);
taskRouter.post("/:listId/tasks", createTask);
taskRouter.put("/tasks/:taskId", updateTask);
taskRouter.delete("/tasks/:taskId", deleteTask);

export default taskRouter;

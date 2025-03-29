import { Router } from "express";
import {
	createColumn,
	getAllColumns,
	updateColumn,
	deleteColumn,
} from "../controllers/column";

const listRouter = Router();

// 1. get all list
listRouter.get("/columns", getAllColumns);

// 2. Create a new list
listRouter.post("/columns", createColumn);

// 3. Update a list name
listRouter.put("/columns/:columnId", updateColumn);

// 4. delete a list
listRouter.delete("/columns/:columnId", deleteColumn);

export default listRouter;

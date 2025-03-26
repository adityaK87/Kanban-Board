import { Router } from "express";
import {
	getAllList,
	createList,
	deleteList,
	updateList,
} from "../controllers/list";

const listRouter = Router();

// 1. get all list
listRouter.get("/lists", getAllList);

// 2. Create a new list
listRouter.post("/lists", createList);

// 3. Update a list name
listRouter.put("/lists/:listId", updateList);

// 4. delete a list
listRouter.delete("/lists/:listId", deleteList);

export default listRouter;

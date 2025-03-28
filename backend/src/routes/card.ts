import { Router } from "express";
import {
	createCard,
	getAllCards,
	updateCard,
	deleteCard,
} from "../controllers/card";

const taskRouter = Router();

taskRouter.get("/:columnId/cards", getAllCards);
taskRouter.post("/:columnId/cards", createCard);
taskRouter.put("/cards/:cardId", updateCard);
taskRouter.delete("/cards/:cardId", deleteCard);

export default taskRouter;

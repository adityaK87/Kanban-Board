import type { Response, Request } from "express";
import { prismaClient } from "../prisma";

export const getAllCards = async (req: Request, res: Response) => {
	try {
		const columnId = req.params.columnId;

		const cards = await prismaClient.card.findMany({
			where: { columnId },
			orderBy: { dueDate: "asc" },
		});

		if (!cards) {
			res.status(404).json({
				message: "List not found or unauthorized",
			});
			return;
		}
		res.status(200).json({ cards });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const createCard = async (req: Request, res: Response) => {
	try {
		const { title, description, dueDate, priority } = req.body;
		const columnId = req.params.columnId;

		if (!columnId || !title) {
			res.status(400).json({
				message: "Title and listId are required",
			});
			return;
		}

		const newCard = await prismaClient.card.create({
			data: {
				title,
				description,
				columnId,
				dueDate,
				priority,
			},
		});

		if (!newCard) {
			res.status(404).json({
				message: "List not found or unauthorized",
			});
			return;
		}
		res.status(200).json({
			message: "Task created successfully",
			newCard,
		});
	} catch (error) {
		res.status(500).json({
			error,
			message: "Internal Server Error",
		});
	}
};

export const updateCard = async (req: Request, res: Response) => {
	try {
		const cardId = req.params.cardId;
		const { title, description, dueDate, priority } = req.body;

		if (!cardId) {
			res.status(404).json({
				message: "Card Id is required!",
			});
			return;
		}

		const updatedCard = await prismaClient.card.update({
			where: {
				id: cardId,
			},
			data: {
				title,
				description,
				priority,
				dueDate,
			},
		});

		if (!updatedCard) {
			res.status(404).json({
				message: "Task id is not Valid!",
			});
			return;
		}

		res.status(200).json({
			message: "Task updated successfully",
			card: updatedCard,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const deleteCard = async (req: Request, res: Response) => {
	try {
		const cardId = req.params.cardId;

		if (!cardId) {
			res.status(404).json({
				message: "Card Id is required!",
			});
			return;
		}

		await prismaClient.card.delete({ where: { id: cardId } });
		res.status(200).json({
			message: "Card deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const moveCard = async (req: Request, res: Response) => {
	try {
		const cardId = req.params.cardId;
		const newColumnId = req.params.toColumnId;

		if (!newColumnId) {
			res.status(400).json({
				message: "newColumnId is required",
			});
			return;
		}
		const existingTask = await prismaClient.card.findUnique({
			where: { id: cardId },
			include: { column: true }, // Include the current list details
		});

		if (!existingTask) {
			res.status(404).json({ message: "Task not found" });
			return;
		}

		const updatedCard = await prismaClient.card.update({
			where: { id: cardId },
			data: { columnId: newColumnId },
		});

		res.status(200).json({
			message: "Card moved successfully",
			card: updatedCard,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

import type { Response, Request } from "express";
import { prismaClient } from "../prisma";

export const getAllList = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const taskList = await prismaClient.list.findMany({
			where: {
				userId,
			},
		});
		res.status(200).json({
			taskList,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
		return;
	}
};

export const createList = async (req: Request, res: Response) => {
	try {
		const title = req.body.title;
		if (!title) {
			res.status(400).json({
				message: "List title is required",
			});
			return;
		}
		const newList = await prismaClient.list.create({
			data: { title, userId: req.userId },
		});
		res.status(200).json({
			message: "List  created succdessfully",
			newList,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

export const deleteList = async (req: Request, res: Response) => {
	try {
		const listId = req.params.listId;
		const userId = req.userId;
		await prismaClient.list.delete({
			where: {
				userId,
				id: listId,
			},
		});

		res.status(200).json({
			message: "List deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
		return;
	}
};

export const updateList = async (req: Request, res: Response) => {
	try {
		const listId = req.params.listId;
		const userId = req.userId;
		const title = req.body.title;

		if (!title) {
			res.status(400).json({
				message: "List title is required",
			});
			return;
		}

		const updatedList = await prismaClient.list.update({
			where: { id: listId, userId },
			data: { title },
		});

		res.status(200).json({
			message: "List updated successfully",
			list: updatedList,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

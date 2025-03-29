import type { Response, Request } from "express";
import { prismaClient } from "../prisma";

export const getAllColumns = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const columns = await prismaClient.column.findMany({
			where: {
				userId,
			},
			include: {
				cards: true,
			},
		});
		res.status(200).json({
			columns,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
		return;
	}
};

export const createColumn = async (req: Request, res: Response) => {
	try {
		const title = req.body.title;
		if (!title) {
			res.status(400).json({
				message: "List title is required",
			});
			return;
		}
		const newColumn = await prismaClient.column.create({
			data: { title, userId: req.userId },
			include: {
				cards: true,
			},
		});
		res.status(200).json({
			message: "List  created succdessfully",
			newColumn,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

export const deleteColumn = async (req: Request, res: Response) => {
	try {
		const columnId = req.params.columnId;
		const userId = req.userId;
		const deletedColumn = await prismaClient.column.delete({
			where: {
				userId,
				id: columnId,
			},
		});

		res.status(200).json({
			message: "List deleted successfully",
			deleteColumnId: deletedColumn.id,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
		return;
	}
};

export const updateColumn = async (req: Request, res: Response) => {
	try {
		const columnId = req.params.columnId;
		const userId = req.userId;
		const title = req.body.title;

		if (!title) {
			res.status(400).json({
				message: "List title is required",
			});
			return;
		}

		const updatedColumn = await prismaClient.column.update({
			where: { id: columnId, userId },
			data: { title },
		});

		res.status(200).json({
			message: "List updated successfully",
			list: updatedColumn,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

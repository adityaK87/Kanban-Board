import type { Response, Request } from "express";
import { prismaClient } from "../prisma";

export const getAllTasks = async (req: Request, res: Response) => {
	try {
		const listId = req.params.listId;

		const tasks = await prismaClient.task.findMany({
			where: { listId },
			orderBy: { dueDate: "asc" },
		});

		if (!tasks) {
			res.status(404).json({
				message: "List not found or unauthorized",
			});
			return;
		}
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const createTask = async (req: Request, res: Response) => {
	try {
		const { title, description, dueDate, priority } = req.body;
		const listId = req.params.listId;

		if (!listId || !title) {
			res.status(400).json({
				message: "Title and listId are required",
			});
			return;
		}

		const newtask = await prismaClient.task.create({
			data: {
				title,
				description,
				listId,
				dueDate,
				priority,
			},
		});

		if (!newtask) {
			res.status(404).json({
				message: "List not found or unauthorized",
			});
			return;
		}
		res.status(200).json({
			message: "Task created successfully",
			newtask,
		});
	} catch (error) {
		res.status(500).json({
			error,
			message: "Internal Server Error",
		});
	}
};

export const updateTask = async (req: Request, res: Response) => {
	try {
		const taskId = req.params.taskId;
		const { title, description, dueDate, priority } = req.body;

		if (!taskId) {
			res.status(404).json({
				message: "Task Id is required!",
			});
			return;
		}

		const updatedTask = await prismaClient.task.update({
			where: {
				id: taskId,
			},
			data: {
				title,
				description,
				priority,
				dueDate,
			},
		});

		if (!updateTask) {
			res.status(404).json({
				message: "Task id is not Valid!",
			});
			return;
		}

		res.status(200).json({
			message: "Task updated successfully",
			task: updatedTask,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const taskId = req.params.taskId;

		if (!taskId) {
			res.status(404).json({
				message: "Task Id is required!",
			});
			return;
		}

		await prismaClient.task.delete({ where: { id: taskId } });
		res.status(200).json({
			message: "Task deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

import type { Request, Response } from "express";
import { prismaClient } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 5);

		const user = await prismaClient.user.create({
			data: { email, password: hashedPassword, name },
		});

		if (!user) {
			res.status(409).json({
				message: "User Already Exist, Please Login",
			});
			return;
		}

		res.status(200).json({
			message: "User created succesfully",
			userId: user.id,
		});
	} catch (error) {
		res.status(409).json({
			message: "User Already Exist, Please Login",
			error: error,
		});
	}
};

export const signin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await prismaClient.user.findFirst({
			where: {
				email,
			},
		});

		if (!user) {
			res.status(401).json({
				message: "Invalid Credentials",
			});
			return;
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			res.status(401).json({
				message: "Password is Incorrect, please type valid password",
			});
			return;
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		});

		res.status(200).json({
			message: "Signed in successfully",
			token,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
			error,
		});
	}
};

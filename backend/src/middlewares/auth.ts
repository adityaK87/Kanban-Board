import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"];
	try {
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			res.status(404).json({
				message: "Unauthorized: token is not provided",
			});
			return;
		}

		const token = authHeader.split(" ")[1];
		if (!token) return;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (decoded) {
			req.userId = (decoded as JwtPayload).userId;
			next();
		}
	} catch (error) {
		res.status(403).json({
			message: "Invalid token",
		});
	}
};

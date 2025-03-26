import express from "express";
import authRouter from "./routes/auth";
import * as dotenv from "dotenv";
import listRouter from "./routes/list";
import taskRouter from "./routes/task";
import { isAuthenticated } from "./middlewares/auth";
dotenv.config();

const app = express();
app.use(express.json());

console.log(process.env.JWT_SECRET);

app.use("/api/v1", authRouter);
app.use("/api/v1", isAuthenticated, listRouter);
app.use("/api/v1", isAuthenticated, taskRouter);

app.listen(3000, (err) => {
	if (err) {
		console.log("Error occured while starting server");
		return;
	}
	console.log("Server is listening on port 3000");
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoute from "./modules/tasks/routes/task.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", taskRoute);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

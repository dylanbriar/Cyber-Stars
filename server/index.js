import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from 'path';
import cookieParser from "cookie-parser";
import authController from "./authController.js";

const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configure cors, json parsing and url encoding
const corsOptions = {
	origin: "*",
	credentials: true,
	optionalSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/hello", (req, res) => {
	console.log("world");
	return res.status(200).send({ message: "world" });
});

//add in auth for sign in
app.post("/", authController.setCookie, (req, res) => {
	return res.status(302).redirect("/home");
});

//add in auth to verify user
app.get("/home", authController.verifyUser, (req, res) => {
	return res.sendFile(path.join(__dirname, "../index.html"));
});

app.use("*", (req, res) =>
	res.status(404).send("404 - This planet is in another galaxy!")
);

app.listen(port, () => console.log(`Server listening on port ${port}...`));

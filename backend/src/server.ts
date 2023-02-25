import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import config from "./utils/config";

const port = config.PORT || 4000;

const app: express.Application = express();
const address: string = "127.0.0.1:4000";

// Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to ouer api 2");
});

// Handle Any Other Routes
app.use((req: Request, res: Response): void => {
  res.status(404).send("Page Not Found - Error (404)");
});

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;

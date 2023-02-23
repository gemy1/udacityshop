import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";

const app: express.Application = express();
const address: string = "127.0.0.1:3000";

// Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/api", router);

// Handle Any Other Routes
app.use((req: Request, res: Response): void => {
  res.status(404).send("Page Not Found - Error (404)");
});

app.listen(4000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;

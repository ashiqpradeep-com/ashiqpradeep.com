import cors from "cors";
import express, { NextFunction, Request } from "express";
import { appConfig } from "./config/app.config";
import { initDB } from "./config/db.config";
import logger from "./config/logger.config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import { pinoHttp } from "pino-http";

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req: Request, _, next: NextFunction) => {
  console.log("kkk");

  req.log.info(`${req.method} ${req.url}`);
  next();
});

app.use("/api", routes);

app.use(errorHandler);

app.listen(appConfig.APP_PORT, async () => {
  console.log(`Server is running on port ${appConfig.APP_PORT}`);
  await initDB();
});

import cors from "cors";
import express from "express";
import { appconfig } from "./config/appConfig";
import { initDB } from "./config/db";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

app.use(errorHandler);

app.listen(appconfig.APP_PORT, async () => {
  console.log(`Server is running on port ${appconfig.APP_PORT}`);
  await initDB();
});

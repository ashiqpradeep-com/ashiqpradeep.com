import fs from "fs";
import path from "path";
import pino from "pino";
import { appConfig } from "./app.config";

const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const errorStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "error.log"),
  { flags: "a" }
);

const infoStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "info.log"),
  { flags: "a" }
);

const streams = [
  //   { level: "info", stream: process.stdout },
  { level: "error", stream: errorStream },
  { level: "info", stream: infoStream },
];

const logger = pino(
  {
    // level: process.env.LOG_LEVEL || "info",
    transport:
      appConfig.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
            },
          }
        : undefined,
    base: {
      pid: false,
      hostname: false,
    },
  },
  pino.multistream(streams)
);

export default logger;

import nodemailer from "nodemailer";
import { appConfig } from "./app.config";

const transporter = nodemailer.createTransport({
  host: appConfig.SMTP_HOST,
  port: Number(appConfig.SMTP_PORT),
  auth: {
    user: appConfig.SMTP_USER,
    pass: appConfig.SMTP_PASS,
  },
});

export default transporter;

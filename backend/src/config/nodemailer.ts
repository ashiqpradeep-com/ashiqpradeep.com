import nodemailer from "nodemailer";
import { appconfig } from "./appConfig";

const transporter = nodemailer.createTransport({
  host: appconfig.SMTP_HOST,
  port: Number(appconfig.SMTP_PORT),
  auth: {
    user: appconfig.SMTP_USER,
    pass: appconfig.SMTP_PASS,
  },
});

export default transporter;

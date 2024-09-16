import fs from "fs";
import hbs from "handlebars";
import path from "path";
import { appConfig } from "../config/app.config";
import transporter from "../config/nodemailer.config";
import { AppException } from "../lib/app-exception";

interface IMail {
  to: string;
  subject: string;
  templateName: string;
  data: unknown;
}

const sendMail = async ({ to, subject, templateName, data }: IMail) => {
  try {
    const compileTemplate = (templateName: string, data: any) => {
      const filePath = path.join(
        __dirname,
        "..",
        "views",
        "emails",
        `${templateName}.hbs`
      );
      const source = fs.readFileSync(filePath, "utf-8").toString();
      const template = hbs.compile(source);
      return template(data);
    };

    const html = compileTemplate(templateName, data);

    const mailOptions = {
      from: `${appConfig.SMTP_USER_NAME} <${appConfig.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
    throw new AppException(
      500,
      "An unknown error occurred while sending email"
    );
  }
};

export default sendMail;

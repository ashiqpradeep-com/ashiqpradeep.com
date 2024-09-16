import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  APP_PORT: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_USER: z
    .string()
    .email({ message: "invalid admin email address" })
    .min(1),
  SMTP_PASS: z.string().min(1),
  SMTP_USER_NAME: z.string().min(1),
  SMTP_PORT: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ADMIN_EMAIL: z
    .string()
    .email({ message: "invalid admin email address" })
    .min(1),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

export const appConfig = result.data;

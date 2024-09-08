import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  APP_PORT: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  SMTP_PORT: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

export const appconfig = result.data;

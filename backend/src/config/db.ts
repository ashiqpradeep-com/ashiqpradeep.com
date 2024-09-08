import mysql from "mysql2/promise";
import { appconfig } from "./appConfig";

const pool = mysql.createPool({
  host: appconfig.DB_HOST,
  user: appconfig.DB_USER,
  password: appconfig.DB_PASS,
  database: appconfig.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function initDB() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection established successfully.");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        email VARCHAR(255) NOT NULL UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `;
    await connection.query(createTableQuery);
    console.log("Contacts table created successfully.");

    connection.release();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database connection error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    process.exit(1);
  }
}

export default pool;

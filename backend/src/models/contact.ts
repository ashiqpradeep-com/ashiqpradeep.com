import { ResultSetHeader } from "mysql2";
import db from "../config/db.config";
import { AppException } from "../lib/app-exception";
import { IContact } from "../types/contact.interface";

export const saveContactToDatabase = async (
  contactData: IContact
): Promise<IContact> => {
  try {
    const { fullName, email, message } = contactData;

    const query = `
      INSERT INTO contacts (full_name, email, message)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query<ResultSetHeader>(query, [
      fullName,
      email,
      message,
    ]);

    return { id: result.insertId, ...contactData };
  } catch (error) {
    throw new AppException(500, "Failed to insert contact into the database");
  }
};

export const findContactByEmail = async (
  email: string
): Promise<IContact[]> => {
  try {
    const query = "SELECT * FROM contacts WHERE email = ?";
    const [rows] = await db.query(query, [email]);

    return rows as IContact[];
  } catch (error) {
    throw new AppException(500, "Failed to retrieve contact from the database");
  }
};

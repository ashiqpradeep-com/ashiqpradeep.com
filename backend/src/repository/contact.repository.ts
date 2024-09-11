import { ResultSetHeader } from "mysql2";
import Contact from "../models/contact";
import pool from "../config/db";

interface IContactRepository {
  save(contact: Contact): Promise<Contact>;
  retrieveByEmail(email: string): Promise<Contact[]>;
}

class ContactRepository implements IContactRepository {
  async save(contact: Contact): Promise<Contact> {
    const query = `INSERT INTO contacts (full_name, email, message, created_at) VALUES (?, ?, ?, ?)`;

    const values = [
      contact.full_name,
      contact.email,
      contact.message || null,
      contact.created_at,
    ];
    const [result] = await pool.query<ResultSetHeader>(query, values);
    contact.id = result.insertId;
    return contact;
  }

  async retrieveByEmail(email: string): Promise<Contact[]> {
    const query = "SELECT * FROM contacts WHERE email = ?";

    const [rows] = await pool.query(query, [email]);

    return rows as Contact[];
  }
}

export default new ContactRepository();

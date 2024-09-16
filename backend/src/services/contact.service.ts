import { AppException } from "../lib/app-exception";
import { findContactByEmail, saveContactToDatabase } from "../models/contact";
import { IContact } from "../types/contact.interface";

const registerContact = async (contactData: IContact): Promise<IContact> => {
  try {
    return await saveContactToDatabase(contactData);
  } catch (error) {
    throw new AppException(500, "An error occurred while adding the contact");
  }
};

const getContactDetailsByEmail = async (email: string): Promise<IContact[]> => {
  try {
    return await findContactByEmail(email);
  } catch (error) {
    throw new AppException(
      500,
      "An error occurred while retrieving the contact by email"
    );
  }
};

export default { registerContact, getContactDetailsByEmail };

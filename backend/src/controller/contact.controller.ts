import { NextFunction, Request, Response } from "express";
import { AppException } from "../lib/app-exception";
import contactService from "../services/contact.service";
import sendMail from "../services/email.service";
import { IContact } from "../types/contact.interface";
import { appConfig } from "../config/app.config";

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, message }: IContact = req.body;

    // Check if the email already exists
    const existingContact = await contactService.getContactDetailsByEmail(
      email
    );

    if (existingContact.length > 0) {
      throw new AppException(409, "Oops, email already exists");
    }

    // Create a new contact
    const newContact = await contactService.registerContact({
      fullName,
      email,
      message,
      created_at: new Date(),
    });

    // Send confirmation email
    await sendMail({
      to: appConfig.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      templateName: "contact",
      data: { fullName, email, message },
    });

    return res.status(201).json({
      message: "Your contact details have been saved successfully.",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

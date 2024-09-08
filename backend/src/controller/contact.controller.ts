import { NextFunction, Request, Response } from "express";
import { AppException } from "../lib/app-exception";
import Contact from "../models/contact";
import contactRepository from "../repository/contact.repository";
import sendMail from "../services/email.service";

type ContactRequestBody = {
  fullName: string;
  email: string;
  message?: string;
};

export const createContact = async (
  req: Request<{}, {}, ContactRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, fullName, message } = req.body;
  try {
    const result = await contactRepository.retrieveByEmail(email);

    if (result.length > 0) {
      throw new AppException(409, "Oops, email already exist");
    }

    const data: Contact = {
      email,
      full_name: fullName,
      message,
      created_at: new Date(),
    };

    await contactRepository.save(data);
    await sendMail({
      to: "info@ashiqpradeep.com",
      subject: "New Contact Form Submission",
      templateName: "contact",
      data,
    });

    return res
      .status(201)
      .json({ message: "Your contact details saved successfully." });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

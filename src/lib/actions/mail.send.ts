"use server";
import { getContactHtmlTemplate } from "@/utils/mailtemplate";
import nodemailer from "nodemailer";

type mailSendProps = {
  success?: boolean;
  error?: string;
};

type FormDataProps = {
  email: string;
  message: string;
  name: string;
};

export const mailSend = async (
  formData: FormDataProps
): Promise<mailSendProps> => {
  try {
    if (!formData) {
      return { error: "Form Data is not found" };
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOptions = {
      from: `${formData.email} - ${formData.name}`,
      to: process.env.MAIL_RECEIVER_ADDRESS,
      subject: `[Toygma Contact]`,
      text: formData.message,
      replyTo: formData.email,
      html: getContactHtmlTemplate(formData.email, formData.message),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

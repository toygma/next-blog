import { Resend } from "resend";
import { User } from "./auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(url: string, user: User) {
  await resend.emails.send({
    from: "no-reply@toygma.com",
    to: user.email!,
    subject: "Verify your email",
    text: `Click the link to verify your email: ${url}`,
  });
}

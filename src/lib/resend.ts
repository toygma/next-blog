import { Resend } from "resend";
import { User } from "./auth";
import { VerificationTemplate } from "./VerificationTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(url: string, user: User) {
  await resend.emails.send({
    from: "no-reply@toygma.com",
    to: user.email!,
    subject: "Verify your email",
    react: VerificationTemplate({
      url,
      name: user.name,
      verifyemail: user.email,
    }),
  });
}

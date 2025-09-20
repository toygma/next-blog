import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "TOYGMA <onboarding@resend.dev>",
          to: [email],
          subject: "Email verification",
          html: `<p>Your otp is <strong>${otp}</strong></p>`,
        });
      },
    }),
  ],
});


export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
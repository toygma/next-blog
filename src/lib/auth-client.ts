import { createAuthClient } from "better-auth/react";
import {
  emailOTPClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
    nextCookies(),
  ],
});

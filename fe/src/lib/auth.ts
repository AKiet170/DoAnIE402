import { db } from "@/index";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendEmail } from "@/lib/send-mail";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Thiết lập lại mật khẩu của bạn",
        text: `Nhấp vào link để thiết lập lại mật khẩu của bạn: ${url}`,
      });
    },
  },
  user: {
    additionalFields: {
      dateOfBirth: {
        type: "date",
        required: false,
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      role: {
        type: "string",
        required: true,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

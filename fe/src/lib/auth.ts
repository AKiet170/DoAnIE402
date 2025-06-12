import { db } from "@/index";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      dateOfBirth: {
        type: "date",
        required: true,
        defaultValue: "2000-01-01",
        input: true,
      },
      phone: {
        type: "string",
        required: true,
        input: true,
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },
});

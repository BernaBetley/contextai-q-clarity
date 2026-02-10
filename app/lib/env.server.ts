import "server-only";

import { z } from "zod";

const optionalUrl = z
  .string()
  .optional()
  .transform((val) => (val && val.length > 0 ? val : undefined))
  .pipe(z.string().url().optional());

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("https://contextaiq.com"),
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_STRIPE_CHECKOUT_URL: optionalUrl,
  NEXT_PUBLIC_AUDIT_INTAKE_URL: optionalUrl,
  NEXT_PUBLIC_CALENDLY_URL: optionalUrl,
  CONTACT_WEBHOOK_URL: optionalUrl,
  CONTACT_WEBHOOK_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);

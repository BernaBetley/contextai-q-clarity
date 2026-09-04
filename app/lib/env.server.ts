import "server-only";

import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default("https://www.contextaiq.com"),
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_STRIPE_CHECKOUT_URL: z.string().url().optional(),
  NEXT_PUBLIC_AUDIT_INTAKE_URL: z.string().url().optional(),
  NEXT_PUBLIC_CALENDLY_URL: z.string().url().optional(),
  CONTACT_WEBHOOK_URL: z.string().url().optional(),
  CONTACT_WEBHOOK_SECRET: z.string().optional(),
});

export const env = envSchema.parse(process.env);

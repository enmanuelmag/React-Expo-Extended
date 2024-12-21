import z from 'zod';

export const EnvSchema = z.object({
  EXPO_PUBLIC_IS_DEV: z.string().default('false'),
  EXPO_PUBLIC_WEB_CLIENT_ID: z.string().default(''),
});

export type EnvType = z.infer<typeof EnvSchema>;

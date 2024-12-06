import z from 'zod';

export const UserSchema = z.object({
  uid: z.string(),
  email: z.string().nullable().optional(),
  displayName: z.string().optional().nullable(),
  type: z.enum(['email', 'google', 'anonymous', 'apple']),
  metadata: z.object({
    pushToken: z.string().optional().nullable(),
  }),
});

export type UserType = z.infer<typeof UserSchema>;

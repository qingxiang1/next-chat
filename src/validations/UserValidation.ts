import { z } from 'zod';

export const AddUserValidation = z.object({
  username: z.string().min(2).max(50, {
    message: "Username must be at most 50 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(16, {
    message: "Password must be at most 16 characters.",
  }),
});

export const EditUserValidation = z.object({
  id: z.coerce.string(), // coerce 强制转换
  username: z.string().min(2).max(50, {
    message: "Username must be at most 50 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).max(16, {
    message: "Password must be at most 16 characters.",
  }),
});

export const DeleteUserValidation = z.object({
  id: z.coerce.string(),
});

import { z } from 'zod';

export const AIChatValidation = z.object({
  message: z.string(),
  sessionId: z.string(),
});
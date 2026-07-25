import { z } from "zod";

const goalSchema = z.object({
  title: z
    .string()
    .min(1, "Goal title is required")
    .max(200, "Goal title is too long"),

  description: z
    .string()
    .max(1000, "Description is too long")
    .optional()
    .default(""),
});

export { goalSchema };

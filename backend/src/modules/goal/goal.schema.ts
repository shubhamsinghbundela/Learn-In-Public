import { z } from "zod";

const goalSchema = z.object({
  title: z.string().min(1, "Goal is required").max(200, "Goal is too long"),
});

export { goalSchema };

import { z } from "zod";

const learningSchema = z.object({
  body: z.string().min(1, "Learning is required"),
});

export { learningSchema };

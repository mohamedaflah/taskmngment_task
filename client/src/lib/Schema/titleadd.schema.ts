import { z } from "zod";

export const titleSchema = z.object({
  title: z.string().nonempty(),
});

import { z } from "zod";

export const columnAddSchema = z.object({
  title: z.string().nonempty(),
  status: z.string().nonempty(),
  priority: z.string().nonempty(),
  deadline: z.date(),
  description: z.string().nonempty(),
});

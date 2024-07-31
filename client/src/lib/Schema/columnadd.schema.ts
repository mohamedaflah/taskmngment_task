import { z } from "zod";

export const columnAddProperty = z.object({
  title: z.string().nonempty(),
  status: z.string().nonempty(),
  priority: z.string().nonempty(),
  deadline: z.string().nonempty(),
  description: z.string().nonempty(),
});

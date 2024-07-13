import * as z from "zod"

export const commentboxSchema = z.object({
  id: z.string(),
  sopid: z.string(),
  comment: z.string(),
})

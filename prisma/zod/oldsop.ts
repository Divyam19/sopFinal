import * as z from "zod"

export const oldsopSchema = z.object({
  id: z.string(),
  newsopid: z.string(),
  uploaderid: z.string(),
  uploadername: z.string(),
  parameter: z.string().nullish(),
  score: z.string().nullish(),
  step1: z.string(),
  step2: z.string(),
  step3: z.string(),
  step4: z.string().nullish(),
  step5: z.string().nullish(),
  title: z.string(),
  date: z.date(),
  accuracy: z.number().int().nullish(),
  completeness: z.number().int().nullish(),
  relevance: z.number().int().nullish(),
})

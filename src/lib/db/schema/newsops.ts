import { newsopSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getNewsops } from "@/lib/api/newsops/queries";


// Schema for newsops - used to validate API requests
const baseSchema = newsopSchema.omit(timestamps)

export const insertNewsopSchema = baseSchema.omit({ id: true });
export const insertNewsopParams = baseSchema.extend({
  date: z.coerce.date(),
  flag: z.coerce.number(),
  accuracy: z.coerce.number(),
  completeness: z.coerce.number(),
  relevance: z.coerce.number()
}).omit({ 
  id: true
});

export const updateNewsopSchema = baseSchema;
export const updateNewsopParams = updateNewsopSchema.extend({
  date: z.coerce.date(),
  flag: z.coerce.number(),
  accuracy: z.coerce.number(),
  completeness: z.coerce.number(),
  relevance: z.coerce.number()
})
export const newsopIdSchema = baseSchema.pick({ id: true });

// Types for newsops - used to type API request params and within Components
export type Newsop = z.infer<typeof newsopSchema>;
export type NewNewsop = z.infer<typeof insertNewsopSchema>;
export type NewNewsopParams = z.infer<typeof insertNewsopParams>;
export type UpdateNewsopParams = z.infer<typeof updateNewsopParams>;
export type NewsopId = z.infer<typeof newsopIdSchema>["id"];
    
// this type infers the return from getNewsops() - meaning it will include any joins
export type CompleteNewsop = Awaited<ReturnType<typeof getNewsops>>["newsops"][number];


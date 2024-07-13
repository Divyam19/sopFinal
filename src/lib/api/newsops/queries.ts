import { db } from "@/lib/db/index";
import { type NewsopId, newsopIdSchema } from "@/lib/db/schema/newsops";

export const getNewsops = async () => {
  const n = await db.newsop.findMany({});
  return { newsops: n };
};

export const getNewsopById = async (id: NewsopId) => {
  const { id: newsopId } = newsopIdSchema.parse({ id });
  const n = await db.newsop.findFirst({
    where: { id: newsopId}});
  return { newsop: n };
};



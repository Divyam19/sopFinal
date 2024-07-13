import { db } from "@/lib/db/index";
import { 
  NewsopId, 
  NewNewsopParams,
  UpdateNewsopParams, 
  updateNewsopSchema,
  insertNewsopSchema, 
  newsopIdSchema 
} from "@/lib/db/schema/newsops";

export const createNewsop = async (newsop: NewNewsopParams) => {
  const newNewsop = insertNewsopSchema.parse(newsop);
  try {
    const n = await db.newsop.create({ data: newNewsop });
    return { newsop: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateNewsop = async (id: NewsopId, newsop: UpdateNewsopParams) => {
  const { id: newsopId } = newsopIdSchema.parse({ id });
  const newNewsop = updateNewsopSchema.parse(newsop);
  try {
    const n = await db.newsop.update({ where: { id: newsopId }, data: newNewsop})
    return { newsop: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteNewsop = async (id: NewsopId) => {
  const { id: newsopId } = newsopIdSchema.parse({ id });
  try {
    const n = await db.newsop.delete({ where: { id: newsopId }})
    return { newsop: n };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};


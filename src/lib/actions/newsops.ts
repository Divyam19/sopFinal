"use server";

import { revalidatePath } from "next/cache";
import {
  createNewsop,
  deleteNewsop,
  updateNewsop,
} from "@/lib/api/newsops/mutations";
import {
  NewsopId,
  NewNewsopParams,
  UpdateNewsopParams,
  newsopIdSchema,
  insertNewsopParams,
  updateNewsopParams,
} from "@/lib/db/schema/newsops";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateNewsops = () => revalidatePath("/newsops");

export const createNewsopAction = async (input: NewNewsopParams) => {
  try {
    const payload = insertNewsopParams.parse(input);
    await createNewsop(payload);
    revalidateNewsops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateNewsopAction = async (input: UpdateNewsopParams) => {
  try {
    const payload = updateNewsopParams.parse(input);
    await updateNewsop(payload.id, payload);
    revalidateNewsops();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteNewsopAction = async (input: NewsopId) => {
  try {
    const payload = newsopIdSchema.parse({ id: input });
    await deleteNewsop(payload.id);
    revalidateNewsops();
  } catch (e) {
    return handleErrors(e);
  }
};
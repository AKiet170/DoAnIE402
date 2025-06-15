"use server";

import { apartments } from "@/db/schema";
import { db } from "@/index";

export async function getApartment() {
  const result = await db.select().from(apartments);
  return result;
}

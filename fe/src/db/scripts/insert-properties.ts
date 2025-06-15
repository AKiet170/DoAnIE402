import { db } from "@/index";
import { propertySeed } from "@/db/seed";
import { property } from "@/db/schema";


export async function InsertProperties() {
  try {
    const insertedProperties = await Promise.all(
      propertySeed.map(async (prop) => {
        return await db.insert(property).values({
          id: prop.id,
          name: prop.name,
          description: prop.description,
        });
      })
    );
    return insertedProperties;
  } catch (error) {
    console.error("Error inserting properties:", error);
    throw error;
  }
}

import { db } from "@/index";
import { furnitureSeed } from "@/db/seed";
import { furnitures } from "@/db/schema";

export async function InsertFurnitures() {
  try {
    const insertedFurnitures = await Promise.all(
      furnitureSeed.map(async (furniture) => {
        return await db.insert(furnitures).values({
          id: furniture.id,
          name: furniture.name,
          description: furniture.description,
          defaultImage: furniture.defaultImage,
          createdAt: furniture.createdAt.toISOString().split("T")[0],
        });
      })
    );
    return insertedFurnitures;
  } catch (error) {
    console.error("Error inserting furnitures:", error);
    throw error;
  }
}

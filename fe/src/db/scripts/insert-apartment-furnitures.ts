import { apartmentFurnitureSeed } from "@/db/seed";
import { apartmentFurnitures } from "@/db/schema";
import { db } from "@/index";

export async function InsertApartmentFurnitures() {
  try {
    const insertedApartmentFurnitures = await Promise.all(
      apartmentFurnitureSeed.map(async (aptF) => {
        return await db.insert(apartmentFurnitures).values({
          id: aptF.id,
          furnitureId: aptF.furnitureId,
          apartmentId: aptF.apartmentId,
          condition: aptF.condition,
          lastCheckedAt: aptF.lastCheckedAt.toISOString().split("T")[0],
          quantity: aptF.quantity,
        });
      })
    );
    return insertedApartmentFurnitures;
  } catch (error) {
    console.error("Error inserting apartment furnitures:", error);
    throw error;
  }
}

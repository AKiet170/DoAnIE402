import { db } from "@/index";
import { floorPropertySeed } from "@/db/seed";
import { floorProperty } from "@/db/schema";

export async function InsertFloorProperties() {
  try {
    const insertedFloorProperties = await Promise.all(
      floorPropertySeed.map(async (floorProp) => {
        return await db.insert(floorProperty).values({
          id: floorProp.id,
          floorId: floorProp.floorId,
          propertyId: floorProp.propertyId,
          quantity: floorProp.quantity,
        });
      })
    );
    return insertedFloorProperties;
  } catch (error) {
    console.error("Error inserting floor properties:", error);
    throw error;
  }
}

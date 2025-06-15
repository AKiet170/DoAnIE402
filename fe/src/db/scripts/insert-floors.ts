import { db } from "@/index";
import { floorSeed } from "@/db/seed";
import { floors } from "@/db/schema";

export async function InsertFloors() {
  try {
    const insertedFloors = await Promise.all(
      floorSeed.map(async (floor) => {
        return await db.insert(floors).values({
          id: floor.id,
          floorNumber: floor.floorNumber,
          buildingName: floor.buildingName,
        });
      })
    );
    return insertedFloors;
  } catch (error) {
    console.error("Error inserting floors:", error);
    throw error;
  }
}

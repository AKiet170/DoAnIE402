import { db } from "@/index";
import { apartmentSeed } from "@/db/seed";
import { apartments } from "@/db/schema";

export async function InsertApartments() {
  try {
    const insertedApartments = await Promise.all(
      apartmentSeed.map(async (apartment) => {
        return await db.insert(apartments).values({
          id: apartment.id,
          roomNumber: apartment.roomNumber,
          type: apartment.type as "1_bed" | "2_bed" | "3_bed" | "studio",
          area: apartment.area,
          status: apartment.status,
          floorId: apartment.floorId,
        });
      })
    );
    return insertedApartments;
  } catch (error) {
    console.error("Error inserting apartments:", error);
    throw error;
  }
}

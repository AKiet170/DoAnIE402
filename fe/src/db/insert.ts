import { InsertApartmentFurnitures } from "@/db/scripts/insert-apartment-furnitures";
import { InsertApartments } from "@/db/scripts/insert-apartments";
import { InsertFloorProperties } from "@/db/scripts/insert-floor-properties";
import { InsertFloors } from "@/db/scripts/insert-floors";
import { InsertFurnitures } from "@/db/scripts/insert-furnitures";
import { InsertProperties } from "@/db/scripts/insert-properties";
import "dotenv/config";
const seed = async () => {
  try {
    await InsertFloors();
    await InsertApartments();
    await InsertFurnitures();
    await InsertProperties();
    await InsertApartmentFurnitures();
    await InsertFloorProperties();
    console.log("Đã chèn dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  }
};

seed();

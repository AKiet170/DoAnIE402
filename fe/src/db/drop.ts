import { db } from "@/index";
import {
  floors,
  apartments,
  furnitures,
  apartmentFurnitures,
  property,
  floorProperty,
} from "@/db/schema"; // Import schema của các bảng

async function dropData() {
  try {
    console.log("Bắt đầu xóa dữ liệu...");

    // Xóa dữ liệu từ các bảng không liên quan trực tiếp đến user trước
    console.log("Xóa bảng apartment_furnitures...");
    await db.delete(apartmentFurnitures).execute();

    console.log("Xóa bảng floor_property...");
    await db.delete(floorProperty).execute();

    console.log("Xóa bảng apartments...");
    await db.delete(apartments).execute();

    console.log("Xóa bảng floors...");
    await db.delete(floors).execute();

    console.log("Xóa bảng furnitures...");
    await db.delete(furnitures).execute();

    console.log("Xóa bảng property...");
    await db.delete(property).execute();

    console.log("Xóa dữ liệu hoàn tất!");
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
    throw error;
  }
}

dropData().catch((err) => {
  console.error("Lỗi khi thực hiện drop:", err);
  process.exit(1);
});

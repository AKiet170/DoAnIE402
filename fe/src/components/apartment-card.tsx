import { SelectApartmentType } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ApartmentCard({
  apartment,
}: {
  apartment: SelectApartmentType;
}) {
  const getApartmentTypeLabel = (type: string | null) => {
    if (!type) {
      return "Không xác định";
    }
    switch (type) {
      case "1_bed":
        return "Phòng 1 người";
      case "2_bed":
        return "Phòng 2 người";
      case "3_bed":
        return "Phòng 3 người";
      case "studio":
        return "Phòng studio";
      default:
        return "Không xác định";
    }
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="h-32 bg-gray-200 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Hình ảnh căn hộ</span>
        </div>
        <CardTitle className="px-4 pt-4 text-lg font-semibold text-foreground">
          Căn hộ: {apartment.roomNumber}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">
            Diện tích:
          </span>
          <span className="text-sm font-semibold">{apartment.area} m²</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">
            Loại:
          </span>
          <span className="text-sm font-semibold">
            {getApartmentTypeLabel(apartment.type)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">
            Trạng thái:
          </span>
          <Badge
            className={
              apartment.status
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }
          >
            {apartment.status ? "Đã thuê" : "Chưa thuê"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">
            Tầng:
          </span>
          <span className="text-sm font-semibold">{apartment.floorId}</span>
        </div>
      </CardContent>
    </Card>
  );
}

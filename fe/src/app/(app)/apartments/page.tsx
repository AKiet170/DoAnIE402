import { ApartmentCard } from "@/components/apartment-card";
import { DonutChart } from "@/components/apartment-status-chart";
import { getApartment } from "@/lib/action/get-apartments";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SelectApartmentType } from "@/db/schema";

interface ApartmentPageProps {
  searchParams: { page?: string };
}

export default async function ApartmentPage({
  searchParams,
}: ApartmentPageProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 9;

  const allApartments = await getApartment();
  const rentedCount = allApartments.filter(
    (apt: SelectApartmentType) => apt.status
  ).length;
  const totalCount = allApartments.length;

  const totalPages = Math.ceil(totalCount / limit);
  const offset = (page - 1) * limit;
  const apartments = allApartments.slice(offset, offset + limit);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-foreground mb-12">
        Danh sách căn hộ
      </h1>
      <div className="mb-12 flex justify-center">
        <DonutChart rented={rentedCount} total={totalCount} />
      </div>
      {apartments.length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">
          Không tìm thấy căn hộ nào.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment: SelectApartmentType) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${page > 1 ? page - 1 : 1}`}
                className={`text-sm font-medium ${page === 1 ? "pointer-events-none opacity-50" : "hover:bg-muted"}`}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href={`?page=${p}`}
                  isActive={p === page}
                  className={`text-sm font-medium ${p === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`?page=${page < totalPages ? page + 1 : totalPages}`}
                className={`text-sm font-medium ${page === totalPages ? "pointer-events-none opacity-50" : "hover:bg-muted"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

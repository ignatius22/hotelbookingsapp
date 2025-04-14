import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString().split('T')[0];

  const { isLoading, data: bookings } = useQuery({
    queryFn: () =>
      getBookings({
        filter: { field: "created_at", value: queryDate, method: "gte" },
      }),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings: bookings?.data || [], numDays };
}
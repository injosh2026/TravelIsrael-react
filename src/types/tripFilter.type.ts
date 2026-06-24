export type TripFilterType = {
    search?: string | null;
    duration?: number | null;
    lengthKM?: number | null;
    dayTripType?: number | null;
    region?: number | null;
    accessibility?: number | null;
    difficulty?: number | null;
    price?: number | null;
    stopsCount?: number | null;
    skip: number;
    take: number;
    sortBy: string;
    sortDirection: "asc" | "desc";
};
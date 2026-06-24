import type { PlaceType } from "./place.type";
import type { RouteType } from "./route.type";

export type DayTripItemType = {
    id: number;
    dayTripId: number;
    itemType: number;
    route: RouteType;
    place: PlaceType;
    orderInTrip: number;
    estimatedDuration: number;
    mode: number | null;
}
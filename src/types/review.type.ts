import type { UserReviweType } from "./userReviwe.type";

export type ReviewType = {
    id: number;
    contentType: number;
    placeId: number;
    routeId: number;
    dayTripId: number;
    user: UserReviweType;
    comment: string;
    createdAt: string;
}
export interface CurrentTripStopType {
    itemId: number;
    itemType: number;
    orderInTrip: number;
}

export interface SuggestedStopsRequestType {
    currentStops: CurrentTripStopType[];
    search?: string;
    regionId?: number;
    limit?: number;
}
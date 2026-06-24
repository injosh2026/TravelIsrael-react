export interface SuggestedStopType {
    itemId: number;
    itemType: number;
    name: string;
    latitude: number;
    longitude: number;
    endLatitude?: number | null;
    endLongitude?: number | null;
    typeName: string;
    regionName: string;
    difficulty: string | null;
    score: number;
    distanceScore: number;
    popularityScore: number;
    ratingScore: number;
    estimatedDuration: number;
    mainImage?: string;
}
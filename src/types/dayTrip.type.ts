import type { AccessibilityType } from "./accessibility.type";
import type { DifficultyType } from "./difficulty.type";
import type { RegionType } from "./region.type";

export type DayTripType = {
    id: number;
    name: string;
    description: string;
    image: string;
    totalDurationHours: number;
    region: RegionType;
    accessibility: AccessibilityType;
    difficulty: DifficultyType; 
    averageRating: number;
    ratingsCount: number;
    reviewsCount: number;
    stopsCount: number;
}
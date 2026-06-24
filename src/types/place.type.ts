import type { AccessibilityType } from "./accessibility.type";
import type { ApprovalStatusType } from "./approvalStatus.type";
import type { ImageType } from "./image.type";
import type { RegionType } from "./region.type";
import type { TypeType } from "./type.type";

export type PlaceType = {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    type: TypeType;
    region: RegionType;
    accessibility: AccessibilityType;
    price: number;
    openingTime: string;
    closingTime: string;
    averageStayMinutes: number;
    averageRating: number;
    ratingsCount: number;
    minTemperature: number;
    maxTemperature: number;
    maxWindSpeed: number;
    maxRainProbability: number;
    maxHumidity: number;
    maxCloudCoverage: number;
    allowRain: boolean;
    hasCommonWeather: boolean;
    createdByUserId: number;
    createdAt: Date;
    approvalStatus: ApprovalStatusType;
    approvedAt: Date;
    rejectReason: Date;
    images: ImageType[];
}
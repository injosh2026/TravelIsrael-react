import type { AccessibilityType } from "./accessibility.type";
import type { TypeType } from "./type.type";
import type { DifficultyType } from "./difficulty.type";
import type { RegionType } from "./region.type";

export type LookupsType = {
    regions: RegionType[];
    difficulties: DifficultyType[];
    accessibilities: AccessibilityType[];
    tripTypes: TypeType[];
};
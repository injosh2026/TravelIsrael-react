import type { DayTripType } from "../types/dayTrip.type";
import type { TripFilterType } from "../types/tripFilter.type";
import type { RecommendedTripType } from "../types/recommendedTrip.type";
import type { PlanDataType } from "../pages/TripPlannerWizard";
import axiosInstance from "./axios";

const url = "DayTrip";

export async function getTopTrips(): Promise<DayTripType[]> {
    try {
        const res = await axiosInstance.get(`${url}/top-three`);
        return res.data;
    } catch (error) {
        console.error("Error fetching top trips:", error);
        return [];
    }
}

export const getFilteredTrips = async (filter: TripFilterType): Promise<DayTripType[]> => {
    try {
        const response = await axiosInstance.post(`${url}/filtered`, filter);
        return response.data;
    } catch (error) {
        console.error('Error fetching trips:', error);
        return [];
    }
};

export const getRecommendedTrips = async (planData: PlanDataType): Promise<RecommendedTripType[]> => {
    try {
        const response = await axiosInstance.post(`${url}/recommend`, planData);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommended trips:', error);
        throw error;
    }
};


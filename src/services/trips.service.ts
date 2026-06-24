import type { DayTripType } from "../types/dayTrip.type";
import type { DayTripDetailType } from "../types/dayTripDetail.type";
import type { TripFilterType } from "../types/tripFilter.type";
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

export const getRecommendedTrips = async (planData: any): Promise<DayTripDetailType[]> => {
    const response = await axiosInstance.post(`${url}/recommend`, planData);
    console.log(response.data)
    return response.data;
};


import type { SuggestedStopsRequestType } from "../types/suggestedStopsRequest.type";
import type { SuggestedStopType } from "../types/suggestedStop.type";
import axiosInstance from "./axios"
const url = "Suggestions";

export const getSuggestedStops = async (request: SuggestedStopsRequestType): Promise<SuggestedStopType[]> => {
    const response = await axiosInstance.post(`${url}`, request);
    return response.data;
};
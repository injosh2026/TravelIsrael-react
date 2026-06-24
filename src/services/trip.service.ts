import type { ApproveRequestType } from "../types/approveRequest.type";
import axiosInstance from "./axios";

const url = "DayTrip";

export const getTripById = async (id: number) => {
  const response = await axiosInstance.get(`${url}/${id}`)
  return response.data
}

export const approveDayTripWithItems = async (id: number, approveRequest: ApproveRequestType) => {
  const response = await axiosInstance.put(`${url}/${id}/approval/with-items`, approveRequest);
  return response.data
};

export const createTrip = async (data: FormData) => {

    const response = await axiosInstance.post(`${url}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};
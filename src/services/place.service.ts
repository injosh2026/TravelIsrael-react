import type { ApproveRequestType } from "../types/approveRequest.type";
import axiosInstance from "./axios"

const url = "Place";

export const approvePlace = async (id: number, approveRequest: ApproveRequestType) => {
  const response = await axiosInstance.put(`${url}/${id}/approval`, approveRequest);
  return response.data
};
 
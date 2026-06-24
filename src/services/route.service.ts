import type { ApproveRequestType } from "../types/approveRequest.type";
import axiosInstance from "./axios"

const url = "Route";

export const approveRoute = async (id: number, approveRequest: ApproveRequestType) => {
  const response = await axiosInstance.put(`${url}/${id}/approval`, approveRequest);
  return response.data
};
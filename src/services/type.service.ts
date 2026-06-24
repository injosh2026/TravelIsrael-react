import axiosInstance from "./axios"

const url = "Type";

export const getTripTypes = async () => {
    const response = await axiosInstance.get(`${url}/day-trip`);
    return response.data;
};
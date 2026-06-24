import axiosInstance from "./axios";

const url = "Lookups";

export const getLookups = async () => {
    const response = await axiosInstance.get(`${url}`);
    return response.data;
    
};
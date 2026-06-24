
import axiosInstance from "./axios"

const url = "Admin";

export const getAdminStats = async () => {
    const response = await axiosInstance.get(`${url}/stats`);
    return response.data;
};

export const getAdminAllTrips = async () => {
    const response = await axiosInstance.get(`${url}/trips`);
    return response.data;
};

export const getAdminPendingTrips = async () => {
    const response = await axiosInstance.get(`${url}/pending-trips`);
    return response.data;
};

export const getAdminAllPlaces = async () => {
    const response = await axiosInstance.get(`${url}/places-and-routes`);
    return response.data;
}; 
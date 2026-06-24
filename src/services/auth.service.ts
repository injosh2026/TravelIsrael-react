
import axiosInstance from "./axios"

const urlAuth = "Auth";

export type LoginType = { email: string, password: string }

export const login = async (credentials: LoginType) => {
  const response = await axiosInstance.post(`${urlAuth}/login`, credentials)
  return response.data
}

export const refreshToken = async (refreshToken: string) => {
  const response = await axiosInstance.post(`${urlAuth}/refresh`, { refreshToken })
  return response.data
}

export const getCurrentUser = async () => {
  const response = await axiosInstance.get(`${urlAuth}/me`)
  return response.data
}

export type RegisterType = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const register = async (data: RegisterType) => {
  const response = await axiosInstance.post(`${urlAuth}/register`, data)
  return response.data
}

export const getUserStatistics = async () => {
    const response = await axiosInstance.get(`${urlAuth}/statistics`);
    return response.data;
};

const urlUser = "User";

export type ProfileType = {
  firstName: string
  lastName: string
  email: string
}

export const updateProfile = async (data: ProfileType) => {
  const response = await axiosInstance.put(`${urlUser}/profile`, data)
  return response.data
}

export type PasswordType = {
  currentPassword: string
  newPassword: string
}

export const changePassword = async (data: PasswordType) => {
  return await axiosInstance.put(`${urlUser}/password`, data)
}
import axios from "../services/axios"

export const setSession = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("token", accessToken)
  localStorage.setItem("refreshToken", refreshToken)
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}

export const getAccessToken = () => localStorage.getItem("token")
export const getRefreshToken = () => localStorage.getItem("refreshToken")

export const removeSession = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refreshToken")
  delete axios.defaults.headers.common.Authorization
}
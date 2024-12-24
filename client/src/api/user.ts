import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/user`


export const registerUser = async (data: {
    name: string,
    email: string,
    password: string
}) => {
    return await axios.post(`${API_URL}/register`, data)
}

export const loginUser = async (data: {
    email: string,
    password: string
}) => {
    return await axios.post(`${API_URL}/login`, data)
}
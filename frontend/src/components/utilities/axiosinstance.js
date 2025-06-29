import axios from 'axios'

const DB_URI = import.meta.env.VITE_DB_URI;

export const axiosInstance = axios.create({
    baseURL:DB_URI,
    withCredentials: true,
    // timeout: 1000,
    headers:{
        "Content-Type" : "application/json",
    },
});
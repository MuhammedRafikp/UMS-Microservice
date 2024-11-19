import axios from "axios";

export const authAPI = axios.create({
    baseURL: "http://localhost:4000"
});


export const userAPI = axios.create({
    baseURL:"http://localhost:5000"
});

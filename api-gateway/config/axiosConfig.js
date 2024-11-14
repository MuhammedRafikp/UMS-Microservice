import axios from "axios";

export const authAPI = axios.create({
    baseURL: 'http://auth-service:4000'
});

export const userAPI = axios.create({
    baseURL: 'http://user-service:5000'
});


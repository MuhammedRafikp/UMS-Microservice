import axios from "axios";

export const authAPI = axios.create({
    baseURL: 'http://35.154.233.89:4000'
});

export const userAPI = axios.create({
    baseURL: 'http://35.154.233.89:5000'
});

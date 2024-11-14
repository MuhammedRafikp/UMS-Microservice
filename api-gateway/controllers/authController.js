import { authAPI } from "../config/axiosConfig.js";

export const register = async (req, res) => {
    try {
        const user = req.body;
        console.log(user)
        const response = authAPI.post('/auth/register', user);
       
    } catch (error) {
        console.log(error.message)
    }
}
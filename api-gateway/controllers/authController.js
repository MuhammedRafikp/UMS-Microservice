import { authAPI } from "../config/axiosConfig.js";

export const login = async (req, res) => {
    try {
        const userData = req.body;

        console.log("userData : ", userData);

        const response = await authAPI.post('/auth/login', userData);

    } catch (error) {
        console.error("Error in login route:", error.message);

    }

}
import { userAPI } from "../config/axiosConfig.js";

export const register = async (req, res) => {
    try {
        const userData = req.body;

        console.log("user :", userData);

        const response = await userAPI.post('/user/register', userData);

        console.log("Response form user-service :", response.data);

        res.status(200).json({
            success: true,
            message: response.data.message
        });

    } catch (error) {
        console.error("Error occurred during registration:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


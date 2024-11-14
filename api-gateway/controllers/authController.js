import { authAPI } from "../config/axiosConfig.js";

export const register = async (req, res) => {
    try {
        const user = req.body;
        console.log(user)
        const response =await authAPI.post('/auth/register', user);

        console.log("Response form auth-service :",response.data);

        res.status(200).json({
            status: true,
            message: response.data.message
        });
        
       
    } catch (error) {
        console.log(error.message)
    }
}
import { authAPI } from "../config/axiosConfig.js";

export const register = async(req,res)=>{
    try {
        const user = req.body;
        const response = authAPI.post('/auth/register',user);
        console.log(user)
    } catch (error) {
        
    }
}
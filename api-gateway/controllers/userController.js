import {userAPI} from "../config/axiosConfig"

const getProfile = async(req,res)=>{
    try {
        const response =await API.get('/userProfile');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    getProfile
}